class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image
  has_many :pictures
  has_many :likes

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :pictures do
    object.pictures
  end

  attribute :liked_pictures do
    likes = Like.where(user_id: object.id).pluck(:picture_id)
    Picture.find(likes)
  end
end
