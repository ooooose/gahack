class Api::V1::UsersController < ApplicationController
  def index
    render json: { message: "Hello World!" }
  end
end
