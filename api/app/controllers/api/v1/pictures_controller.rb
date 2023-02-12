class Api::V1::PicturesController < ApplicationController
  before_action :set_picture, only: %i[show update destroy]
  include CarrierwaveBase64Uploader

  def index
    pictures = Picture.all.recent.includes(:user, :theme, :likes, {user: :comments})
    render_json = ActiveModelSerializers::SerializableResource.new(
      pictures,
      includes: "**",
      each_serializer: PictureSerializer,
      current_api_v1_user: current_api_v1_user
    ).as_json
    render json: render_json
  end

  def show
    render_json = ActiveModelSerializers::SerializableResource.new(
      @picture,
      includes: "**",
      serializer: PictureSerializer,
      current_api_v1_user: current_api_v1_user
    ).as_json
    render json: render_json, status: 200
  end

  def create
    picture = current_api_v1_user.pictures.build(picture_params)
    picture.twitter_card = base64_conversion(picture_params[:image])
    if picture.save
      render json: picture
    else
      render json: { status: 400 }
    end
  end

  def destroy
    @picture.destroy
    render json: @picture
  end

  def update
    if @picture.update(frame_params)
      render json: @picture, serializer: PictureSerializer
    else
      render json: { status: 500, message: '更新に失敗しました' }
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

  def frame_params
    params.require(:picture).permit(:frame_id)
  end

end
