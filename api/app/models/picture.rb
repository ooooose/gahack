class Picture < ApplicationRecord
  belongs_to :user
  belongs_to :theme
  # いいね機能
  has_many :likes
  has_many :liked_users, through: :likes, source: :user

  validates :image, presence: true
  validates :user_id, presence: true
  validates :theme_id, presence: true

  def liked_by(user)
    likes.find{ |f| f.user_id == user.id }
  end
end
