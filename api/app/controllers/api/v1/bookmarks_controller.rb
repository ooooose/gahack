class Api::V1::BookmarksController < ApiController
  def create
    picture = Picture.find(params[:picture_id])
    current_api_v1_user.bookmark(picture)
    head :ok
  end

  def destroy
    picture = Picture.find(params[:picture_id])
    current_api_v1_user.unbookmark(picture)
    head :ok
  end
end
