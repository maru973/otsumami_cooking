class Recipe
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :recipeTitle, :string
  attribute :foodImageUrl, :string
  attribute :recipeUrl, :string
  attribute :recipeMaterial, default: []
  attribute :recipeCost, :string
  attribute :recipeIndication, :string

  class << self
    def all
      AccessRakutenRecipeApi.search
    end
  end

  def has_error?
    status.to_s.match?(/^[45]/)
  end
end