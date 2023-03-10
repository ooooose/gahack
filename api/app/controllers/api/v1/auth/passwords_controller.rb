class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  private

    def respond_with(resource, _opts = {})
      send_reset_mail_success && return if resource.blank?
      reset_password_success && return if resource.persisted?

      reset_password_failed
    end
end
