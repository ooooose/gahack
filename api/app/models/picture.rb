class Picture < ApplicationRecord
  belongs_to :user
  belongs_to :theme
  has_many :likes
  has_many :liked_user, through: :likes, source: :user

  validates :image, presence: true
  validates :user_id, presence: true
  validates :theme_id, presence: true
end
