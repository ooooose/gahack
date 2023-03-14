class UserSerializer < ActiveModel::Serializer
  attributes %i[id name image]

  has_many :pictures, serializer: PictureSerializer
  has_many :comments, serializer: CommentSerializer
  has_many :liked_pictures, serializer: PictureSerializer
  has_many :followings
  has_many :followers
  has_many :bookmark_pictures

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :following do
    if @current_api_v1_user
      @current_api_v1_user.following?(object)
    end
  end

  attribute :monthly_likes do
    Like.monthly.where(picture_id: Picture.where(user_id: object.id).pluck(:id)).count
  end
end
