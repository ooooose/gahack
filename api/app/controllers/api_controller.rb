class ApiController < ActionController::Base
  # protect_from_forgery
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?
end
