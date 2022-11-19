class User < ApplicationRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :name, presence: true, length: { maximum: 30 }
  validates :email, presence: true, uniqueness: { case_sensitive: true }
end
