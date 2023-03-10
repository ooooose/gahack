class Api::V1::RelationshipsController < ApiController
  before_action :set_user, only: %i[create destroy]

  def create
    current_api_v1_user.follow(@user)
    head :ok
  end

  def destroy
    current_api_v1_user.unfollow(@user)
    head :ok
  end

  private

    def set_user
      @user = User.find(params[:user_id])
    end
end
