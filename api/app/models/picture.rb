class Picture < ApplicationRecord
  belongs_to :user
  belongs_to :theme

  validates :image, presence: true
  validates :user_id, presence: true
  validates :theme_id, presence: true
end
