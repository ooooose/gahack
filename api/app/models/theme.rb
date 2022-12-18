class Theme < ApplicationRecord
  has_many :pictures, dependent: :destroy
  validates :title, presence: true
end
