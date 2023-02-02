class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController

  private

  def respond_with(resource, _opts = {})
    send_reset_mail_success && return unless resource.present?
    reset_password_success && return if resource.persisted?

    reset_password_failed
  end

  def send_reset_mail_success
    render json: { message: 'Send Reset Mail successfully' }
  end

  def reset_password_success
    render json: { message: 'Password Reset successfully' }
  end

  def rest_password_failed
    render json: { message: 'Something went wrong.' }
  end
end
