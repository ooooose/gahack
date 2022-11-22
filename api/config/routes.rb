Rails.application.routes.draw do
  # letter_opener用に設定
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :test, only: %i[index]

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations"
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
