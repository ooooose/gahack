class Api::V1::LikesController < ApplicationController
  def create
    @like = current_api_v1_user.likes.create(picture_id: picture_params[:picture_id])
    rendre json: @like
  end

  def destroy
    @like = Like.find_by(picture_id: picture_params[:picture_id], user_id: current_api_v1_user.id)
    @like.destroy
    render json: @like
  end

  private

  def like_params
    params.require(:like).permit(:picture_id)
  end
end
