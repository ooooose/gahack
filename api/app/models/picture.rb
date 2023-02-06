class Picture < ApplicationRecord
  belongs_to :user
  belongs_to :theme
  # いいね機能
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :comments, dependent: :destroy
  mount_uploader :twitter_card, ImageUploader

  # 描かれた絵を作成順に並び替える
  scope :by_recently_created, -> { order(created_at: :desc) }

  validates :image, presence: true
  validates :user_id, presence: true
  validates :theme_id, presence: true

  def liked_by(user)
    likes.find{ |f| f.user_id == user.id }
  end

end
