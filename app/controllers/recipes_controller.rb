
class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
  end

  def show; end

  private

  def set_recipe
    @recipe = Recipe.order("RANDOM()").first
  end
end
