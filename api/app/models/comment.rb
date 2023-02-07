class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :picture

  scope :recent, -> { order(created_at: :desc) }
end
