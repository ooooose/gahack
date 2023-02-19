class Api::V1::UsersController < ApiController
  before_action :set_user, only: %i[show update]

  def show
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

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:name, :image)
  end
end
