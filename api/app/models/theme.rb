class Theme < ApplicationRecord
  has_many :pictures, dependent: :destroy
  validates :title, presence: true

  scope :recent, -> { order(created_at: :desc) }
end
