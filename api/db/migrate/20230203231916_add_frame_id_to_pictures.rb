class AddFrameIdToPictures < ActiveRecord::Migration[6.1]
  def change
    add_reference :pictures, :frame, foreign_key: true
  end
end
