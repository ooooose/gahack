class Api::V1::ThemesController < ApplicationController
  before_action :set_theme, only: %i[show destroy]

  def index
    themes = Theme.all.recent
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
    render_json = ActiveModelSerializers::SerializableResource.new(
      @theme,
      include: :pictures,
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
