class AddIndexTitleToThemes < ActiveRecord::Migration[6.1]
  def change
    add_index :themes, :title, unique: true
  end
end
