class Picture < ApplicationRecord
  belongs_to :user
  belongs_to :theme

  has_many :likes, -> { order(created_at: :desc) }, inverse_of: :picture, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :comments, -> { order(created_at: :desc) }, inverse_of: :picture, dependent: :destroy
  has_many :bookmarks, -> { order(created_at: :desc) }, inverse_of: :picture, dependent: :destroy
  mount_uploader :twitter_card, ImageUploader

  # 描かれた絵を作成順に並び替える
  scope :recent, -> { order(created_at: :desc) }
  scope :best_pictures, -> { sort {|a, b| b.likes.monthly.size <=> a.likes.monthly.size }.first(3) }
  scope :monthly, -> { where(created_at: Time.current.all_month) }

  validates :image, presence: true
  validates :user_id, presence: true
  validates :theme_id, presence: true

  def liked_by(user)
    likes.find {|f| f.user_id == user.id }
  end
end
