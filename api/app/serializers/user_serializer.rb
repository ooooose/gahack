class UserSerializer < ActiveModel::Serializer
  attributes %i[id name image]
  has_many :pictures, serializer: PictureSerializer
  has_many :comments, serializer: CommentSerializer do
    object.comments.recent
  end
  has_many :likes
  has_many :liked_pictures, each_serializer: PictureSerializer

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :pictures do
    object.pictures
  end
end
