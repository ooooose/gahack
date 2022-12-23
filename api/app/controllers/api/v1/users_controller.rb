class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show update]

  def show
    render_json = ActiveModelSerializers::SerializableResource.new(
      @user,
      include: "**",
      serializer: UserSerializer,
      current_api_v1_user: current_api_v1_user,
    ).as_json
    render json: render_json
  end

  def update
    @user.update!(user_parasm)
    render json: @user
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :image)
  end
end
