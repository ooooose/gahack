class UserSerializer < ActiveModel::Serializer
  attributes %i[id name image]

  has_many :pictures, serializer: PictureSerializer do
    object.pictures.recent
  end
  has_many :comments, serializer: CommentSerializer do
    object.comments.recent
  end
  has_many :likes
  has_many :liked_pictures, each_serializer: PictureSerializer
  has_many :followings
  has_many :followers

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :following do
    if @current_api_v1_user
      @current_api_v1_user.following?(object)
    end
  end
end
