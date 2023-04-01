class Theme < ApplicationRecord
  has_many :pictures, -> { order(created_at: :desc) }, dependent: :destroy
  validates :title, presence: true, uniqueness: true

  scope :recent, -> { order(created_at: :desc) }
end
