class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :picture

  validates :body, presence: true

  scope :recent, -> { order(created_at: :desc) }
end
