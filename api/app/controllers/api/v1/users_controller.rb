class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show]

  def show
    render_json = ActiveModelSerializers::SerializableResource.new(
      @user,
      include: "**",
      serializer: UserSerializer,
      current_api_v1_user: current_api_v1_user,
    ).as_json
    render json: render_json
  end

  private
  
  def set_user
    @user = User.find(params[:id])
  end
end
