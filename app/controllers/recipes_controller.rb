class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show]  
  def index
    @recipes = Recipe.all
  end

  def show; end

  private

  def set_recipe
    if Recipe.count.zero?
      @recipes = AccessRakutenRecipeApi.search_and_save.all.sample
    else
      @recipe = Recipe.all.sample
    end
  end
end
