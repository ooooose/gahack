class AddIndexToLikes < ActiveRecord::Migration[6.1]
  def change
    add_index :likes, [:user_id, :picture_id], unique: true
  end
end
