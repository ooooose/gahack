Rails.application.routes.draw do
  # letter_opener用に設定
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api, format: 'json' do
    namespace :v1 do
      # usersはまだindexしか用意していない。
      resources :users, only: %i[show update]
      resources :themes, only: %i[index create show destroy]
      # picturesはupdateを今後実装予定だが、一旦はパス
      resources :pictures, only: %i[index create show destroy] do
        resources :comments, only: %i[create destroy]
      end
      resources :likes, only: %i[create destroy]
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
