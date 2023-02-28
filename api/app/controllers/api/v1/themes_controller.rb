class Api::V1::ThemesController < ApiController
  before_action :set_theme, only: %i[destroy]

  def index
    themes = Theme.all.recent.includes({ pictures: [:comments, :likes, { user: [:followings, :followers] }] })
    render_json = ActiveModelSerializers::SerializableResource.new(
      themes,
      includes: '**',
      each_serializer: ThemeSerializer,
      current_api_v1_user: current_api_v1_user
    ).as_json
    render json: render_json
  end

  def create
    @theme = Theme.new(theme_params)
    if @theme.save
      render json: @theme, status: :created
    else
      render json: { status: 400 }
    end
  end

  def show
    @theme = Theme.includes({ pictures: [:comments, :likes, { user: [:followings, :followers] }]}).find(params[:id])
    render_json = ActiveModelSerializers::SerializableResource.new(
      @theme,
      includes: "**",
      serializer: ThemeSerializer,
      current_api_v1_user: current_api_v1_user
    )
    render json: render_json.as_json
  end

  def destroy
    if @theme.destroy
      render json: @theme
    else
      render json: { status: 400 }
    end
  end

  private

  def set_theme
    @theme = Theme.find(params[:id])
  end

  def theme_params
    params.require(:theme).permit(:title)
  end
end
