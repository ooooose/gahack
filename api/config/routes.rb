Rails.application.routes.draw do
  # letter_opener用に設定
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :users, only: %i[show update] do
        resources :relationships, only: %i[create destroy]
      end
      resources :themes, only: %i[index create show destroy]
      resources :pictures, only: %i[index create show destroy update] do
        resources :comments, only: %i[create destroy]
      end
      resources :bookmarks, only: %i[create destroy]
      resources :likes, only: %i[create destroy]
      resources :test, only: %i[index]

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        passwords: 'api/v1/auth/passwords',
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      devise_scope :api_v1_user do
        post "auth/guest_sign_in", to: "auth/guests#guest_sign_in"
      end
    end
  end
end
