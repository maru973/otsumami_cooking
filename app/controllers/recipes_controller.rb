class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show]  
  def index
    if Recipe.count.zero?
      @recipes = AccessRakutenRecipeApi.search_and_save.all
    else
      @recipes = Recipe.all
    end
  end

  def show
  end

  private

  def set_recipe
    @recipe = Recipe.all.sample
  end
end
