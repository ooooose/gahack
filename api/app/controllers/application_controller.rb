class ApplicationController < ActionController::Base
  protect_from_forgery prepend: true, with: :exception

  skip_before_action :verify_authenticity_token
end
