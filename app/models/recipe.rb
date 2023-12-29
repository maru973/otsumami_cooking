class Recipe < ApplicationRecord
  validates :title, uniqueness: true

  def self.create_from_api_data(api_data)
    create(
      title: api_data[:recipeTitle],
      url: api_data[:recipeUrl],
      food_image_url: api_data[:foodImageUrl],
      recipe_material: api_data[:recipeMaterial],
      recipe_cost: api_data[:recipeCost],
      recipe_indication: api_data[:recipeIndication]
    )
  end
end