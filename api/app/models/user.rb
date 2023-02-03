class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
  mount_uploader :image, ImageUploader
  has_many :pictures, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_pictures, through: :likes, source: :picture
  has_many :comments, dependent: :destroy

  # フォロー、リフォロー
  has_many :relationships
  has_many :followings, through: :relationships, source: :follow
  has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id'
  has_many :followers, through: :reverse_of_relationships, source: :user

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
      self.relationships.find_or_create_by(follow_id: user.id)
    end
  end

  def unfollow(user)
    relationship = self.relationships.find_by(follow_id: user.id)
    relationship.destroy if relationship
  end

  def following?(user)
    self.followings.include?(user)
  end
end
