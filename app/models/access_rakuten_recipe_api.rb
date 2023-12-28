require 'net/http'

class AccessRakutenRecipeApi
  RWS_APPLICATION_ID = ENV['RWS_APPLICATION_ID']
  class << self
    def search(params = {})
      # paramsを使って柔軟に検索パラメータを追加できる想定
      # （だが、下記URLは静的なレスポンスしか返さないので未実装）
      uri = URI.parse("https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=36-491-1670&applicationId=#{RWS_APPLICATION_ID}")
      json = Net::HTTP.get(uri)
      data_list = JSON.parse(json, symbolize_names: true)
      filtered_data_list = data_list[:result].map do |recipe_data|
        {
          recipeTitle: recipe_data[:recipeTitle],
          foodImageUrl: recipe_data[:foodImageUrl],
          recipeUrl: recipe_data[:recipeUrl],
          recipeMaterial: recipe_data[:recipeMaterial],
          recipeCost: recipe_data[:recipeCost],
          recipeIndication: recipe_data[:recipeIndication]
        }
      end

      filtered_data_list.map { |data| Recipe.new(data) }
    end
  end
end