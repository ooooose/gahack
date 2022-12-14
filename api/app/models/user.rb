class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
  mount_uploader :image, ImageUploader
  has_many :pictures, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_pictures, through: :likes, source: :picture

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
end
