class Like < ApplicationRecord
  belongs_to :picture
  belongs_to :user
  validates_uniqueness_of :picture_id, scope: :user_id
end
