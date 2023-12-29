class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :url
      t.string :food_image_url
      t.string :recipe_material
      t.string :recipe_cost
      t.string :recipe_indication
      
      t.timestamps
    end
  end
end
