class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :picture

  validates :user_id, uniqueness: { scope: :picture_id }
end
