class Api::V1::PicturesController < ApplicationController
  before_action :set_picture, only: %i[show destroy]

  def index
    pictures = Picture.all.includes(:user, :theme)
    render_json = ActiveModelSerializers::SerializableResource.new(
      pictures,
      includes: "**",
      each_serializer: PictureSerializer,
      current_api_v1_user: current_api_v1_user
    )
    render json: render_json.as_json
  end

  def show
    render_json = ActiveModelSerializers::SerializableResource.new(
      @picture,
      serializer: PictureSerializer,
      current_api_v1_user: current_api_v1_user
    )
    render json: render_json.as_json, status: 200
  end

  def create
    picture = current_api_v1_user.pictures.build(picture_params)
    if picture.save
      render json: picture
    else
      # status400をすることでビューにどう表示するかを検討（エラーハンドリング）
      render json: { status: 400 }
    end
  end

  def destroy
    if @picture.destroy
      render json: @picture
    else
      render json: { status: 400 }
    end
  end

  # プライベートメソッド
  private

  def set_picture
    @picture = Picture.find(params[:id])
  end

  def picture_params
    params.require(:picture).permit(:image, :theme_id)
  end
end
