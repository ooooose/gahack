class Api::V1::TestController < ApplicationController
  # 実装が進んでいったら消すこと！！！
  def index
    render json: { message: "Hello World!" }
  end
end
