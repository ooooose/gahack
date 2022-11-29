class Api::V1::PicturesController < ApplicationController
  before_action :set_picture, only: %i[show destroy]

  def index
    pictures = Picture.all.includes(:user, :theme)
    render json: pictures.as_json(include: [{ user: { only: %i[id name] }},
                                            { theme: { only: %i[id title] } }])
  end

  def show
    render json: @picture
  end

  def create
    # user_idとの紐付けはどのようにして行うべきか要検討
    picture = Picture.new(picture_params)
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
    params.require(:pictures).permit(:image, :user_id, :theme_id)
  end
end
