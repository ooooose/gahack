Rails.application.routes.draw do
  namespace :api, format: 'json' do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations"
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
