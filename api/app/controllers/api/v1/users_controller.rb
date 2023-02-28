class Api::V1::UsersController < ApiController
  before_action :set_user, only: %i[update]

  def show
    @user = User.includes({ pictures: [:comments, :likes, :theme] }, :bookmarks, :comments, :likes, :followings, :followers).find(params[:id])
    render_json = ActiveModelSerializers::SerializableResource.new(
      @user,
      includes: "**",
      serializer: UserSerializer,
      current_api_v1_user: current_api_v1_user
    ).as_json
    render json: render_json, status: 200
  end

  def update
    if @user.update(user_params)
      render json: { status: 200, user: @user, message: "更新しました" }
    else
      render json: { status: 500, message: "更新に失敗しました" }
    end
  end

  def best_users
    picture_like_count = {}
    User.all.includes({ pictures: [:comments, :likes, :theme] }, :bookmarks, :comments, :likes, :followings, :followers).without_guests.each do |user|
      picture_like_count.store(user, Like.monthly.where(picture_id: Picture.where(user_id: user.id).pluck(:id)).count)
    end
    @best_users = picture_like_count.sort_by { |_, v| v }.reverse.to_h.keys.first(3)
    render_json = ActiveModelSerializers::SerializableResource.new(
      @best_users,
      includes: '**',
      each_serializer: UserSerializer,
    ).as_json
    render json: render_json
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:name, :image)
  end
end
