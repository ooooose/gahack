class AddFrameIdToPictures < ActiveRecord::Migration[6.1]
  def change
    add_column :pictures, :frame_id, :integer
  end
end
