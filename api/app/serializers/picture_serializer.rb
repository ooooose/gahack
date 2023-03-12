class PictureSerializer < ActiveModel::Serializer
  attributes %i[id twitter_card frame_id created_at]

  has_many :comments, serializer: CommentSerializer do
    object.comments.includes(:user, :picture).recent
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
      object.likes.includes(:user, :picture).find_by(user_id: @current_api_v1_user.id)&.id
    end
  end

  attribute :likes do
    object.likes.includes(:user, :picture).count
  end

  attribute :monthly_likes do
    object.likes.includes(:user, :picture).monthly.count
  end

  attribute :bookmarked do
    if @current_api_v1_user
      @current_api_v1_user.bookmark?(object)
    end
  end

  attribute :bookmark_id do
    if @current_api_v1_user
      @current_api_v1_user.bookmarks.includes(:user, :picture).find_by(picture_id: object.id)&.id
    end
  end

  attribute :theme do
    object.theme
  end

  attribute :user do
    object.user
  end
end
