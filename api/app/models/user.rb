class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  mount_uploader :image, AvatarUploader
  has_many :pictures, -> { order(created_at: :desc) }, inverse_of: :user, dependent: :destroy
  has_many :likes, inverse_of: :user, dependent: :destroy
  has_many :liked_pictures, through: :likes, source: :picture
  has_many :comments, -> { order(created_at: :desc) }, inverse_of: :user, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmark_pictures, through: :bookmarks, source: :picture

  # フォロー、リフォロー
  has_many :relationships, dependent: :destroy
  has_many :followings, through: :relationships, source: :follow
  has_many :reverse_of_relationships, class_name: "Relationship", foreign_key: "follow_id", inverse_of: :follow, dependent: :destroy
  has_many :followers, through: :reverse_of_relationships, source: :user

  scope :without_guests, -> { where.not(name: "ゲストユーザー") }

  validates :name, presence: true, length: { maximum: 30 }
  validates :email, presence: true, uniqueness: { case_sensitive: true }

  def like(picture)
    liked_pictures << picture
  end

  def unlike(picture)
    liked_pictures.delete(picture)
  end

  def like?(picture)
    picture.liked_users.include?(self)
  end

  def follow(user)
    unless self == user
      self.relationships.find_or_create_by!(follow_id: user.id)
    end
  end

  def unfollow(user)
    relationship = self.relationships.find_by(follow_id: user.id)
    relationship.destroy! if relationship
  end

  def following?(user)
    self.followings.include?(user)
  end

  def bookmark(picture)
    bookmark_pictures << picture
  end

  def unbookmark(picture)
    bookmark_pictures.destroy(picture)
  end

  def bookmark?(picture)
    bookmark_pictures.include?(picture)
  end

  # ゲストログイン用メソッド
  def self.guest
    num = Random.new
    find_or_create_by!(email: "guest-#{num.rand(10)}@example.com") do |user|
      user.password = SecureRandom.urlsafe_base64
      user.name = "ゲストユーザー"
    end
  end
end
