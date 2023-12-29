require 'net/http'
require 'uri'
require 'json'

class AccessRakutenRecipeApi
  RWS_APPLICATION_ID = ENV['RWS_APPLICATION_ID']

  class << self
    def search_and_save(params = {})
      category_ids = ['36-491-1670', '36-496-1675', '10-67-1491', '12-101-24', '13-108-490', '26-260-1072', '30-312-2107', '30-315-1232'] # リクエストするカテゴリーIDの配列
      params[:applicationId] = RWS_APPLICATION_ID
      params[:format] = 'json'
      filtered_data_list = []

      category_ids.each do |category_id|
        params[:categoryId] = category_id
        uri = URI.parse("https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426")
        uri.query = URI.encode_www_form(params)
        
        begin
          json = Net::HTTP.get(uri)
          data_list = JSON.parse(json, symbolize_names: true)
          filtered_data_list.select! do |recipe_data|
            recipe_data[:recipeIndication].include?('5分以内')
          end
          filtered_data_list += data_list[:result].map do |recipe_data|
            {
              recipeTitle: recipe_data[:recipeTitle],
              foodImageUrl: recipe_data[:foodImageUrl],
              recipeUrl: recipe_data[:recipeUrl],
              recipeMaterial: recipe_data[:recipeMaterial],
              recipeCost: recipe_data[:recipeCost],
              recipeIndication: recipe_data[:recipeIndication]
            }
          end
        rescue StandardError => e
          puts "An error occurred: #{e.message}"
        end

        # 別のカテゴリIDに対するリクエストの前に待機
        sleep(1)
      end

      # Recipeオブジェクトを作成して返す

      # データを保存
      filtered_data_list.each do |data|
        Recipe.create_from_api_data(data)
      end

      # 保存したデータを取得して返す
      Recipe.all
    end
  end
end