class PictureSerializer < ActiveModel::Serializer
  attributes %i[id image created_at]

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :liked do
    @current_api_v1_user.like?(object)
  end

  attribute :like_id do
    object.likes.find_by(user_id: @current_api_v1_user.id)&.id
  end

  attribute :likes do
    object.likes.count
  end

  attribute :theme do
    object.theme
  end
end
