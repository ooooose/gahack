class Api::V1::LikesController < ApiController
  def create
    picture = Picture.find(params[:picture_id])
    current_api_v1_user.like(picture)
    head :ok
  end

  def destroy
    picture = Picture.find(params[:picture_id])
    current_api_v1_user.unlike(picture)
    head :ok
  end
end
