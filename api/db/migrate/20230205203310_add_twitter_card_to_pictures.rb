class AddTwitterCardToPictures < ActiveRecord::Migration[6.1]
  def change
    add_column :pictures, :twitter_card, :string
  end
end
