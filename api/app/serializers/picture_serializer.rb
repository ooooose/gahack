class PictureSerializer < ActiveModel::Serializer
  attributes %i[id image created_at]

  has_many :comments, serializer: CommentSerializer do
    object.comments.recent
  end

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :liked do
    if @current_api_v1_user
      @current_api_v1_user.like?(object)
    end
  end

  attribute :like_id do
    if @current_api_v1_user
      object.likes.find_by(user_id: @current_api_v1_user.id)&.id
    end
  end

  attribute :likes do
    object.likes.count
  end

  attribute :theme do
    object.theme
  end

  attribute :user do
    object.user
  end
end
