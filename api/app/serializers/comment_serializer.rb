class CommentSerializer < ActiveModel::Serializer
  attributes %i[id body]

  belongs_to :picture
  belongs_to :user

  attribute :user do
    object.user
  end

  attribute :picture do
    object.picture
  end
end
