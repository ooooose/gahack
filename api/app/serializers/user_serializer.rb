class UserSerializer < ActiveModel::Serializer
  attributes %i[id name image]
  has_many :pictures, each_serializer: PictureSerializer
  has_many :comments, each_serializer: CommentSerializer
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
