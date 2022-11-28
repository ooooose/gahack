class Api::V1::ThemesController < ApplicationController
  before_action :set_theme, only: %i[show]

  def index
    @themes = Theme.all.includes(:pictures)
    render json: @themes.as_json
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
    render json: @theme.as_json
  end


  private

  def set_theme
    @theme = Theme.find(params[:id])
  end

  def theme_params
    params.require(:theme).permit(:title)
  end
end
