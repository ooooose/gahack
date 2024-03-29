class Api::V1::PicturesController < ApiController
  before_action :set_picture, only: %i[update destroy]
  include CarrierwaveBase64Uploader

  def index
    pictures = Picture.all.recent.includes({ user: [:likes, :liked_pictures, :comments, :bookmarks, :bookmark_pictures, :followings, :followers] },
                                           :theme, { likes: :picture }, :liked_users, { comments: :picture }, { bookmarks: :picture })
    render_json = ActiveModelSerializers::SerializableResource.new(
      pictures,
      each_serializer: PictureSerializer,
      current_api_v1_user: current_api_v1_user,
    ).as_json
    render json: render_json
  end

  def show
    @picture = Picture.includes({ user: [:likes, :liked_pictures, :comments, :bookmarks, :bookmark_pictures, :followings, :followers] },
                                :theme, { likes: :picture }, :liked_users, { comments: :picture }, { bookmarks: :picture }).find(params[:id])
    render_json = ActiveModelSerializers::SerializableResource.new(
      @picture,
      serializer: PictureSerializer,
      current_api_v1_user: current_api_v1_user,
    ).as_json
    render json: render_json, status: :ok
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
    @picture.destroy!
    render json: @picture
  end

  def update
    if @picture.update(frame_params)
      render json: @picture, serializer: PictureSerializer
    else
      render json: { status: 500, message: "更新に失敗しました" }
    end
  end

  # TOP5の絵をランキング形式で表示
  def best_pictures
    @pictures = Picture.includes({ user: [:likes, :liked_pictures, :comments, :bookmarks, :bookmark_pictures, :followings, :followers] },
                                 :theme, :liked_users, { likes: :picture }, { comments: :picture }, { bookmarks: :picture }).recent.best_pictures
    render_json = ActiveModelSerializers::SerializableResource.new(
      @pictures,
      each_serializer: PictureSerializer,
    ).as_json
    render json: render_json
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
