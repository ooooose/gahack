require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Myapp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # deviseを使用する際に設定
    config.session_store :cookie_store, key: "_interslice_session"
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Flash
    # config.middleware.use Rack::MethodOverride
    config.middleware.use ActionDispatch::Session::CookieStore, config.session_options

    # クロスドメイン対策を導入
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "localhost:8000", 'https://gahack.netlify.app'
        resource "*",
                 headers: :any,
                 expose: ['access-token', "expiry", "token-type", "uid", "client"],
                 methods: [:get, :post, :options, :delete, :put]
      end
    end
    config.i18n.default_locale = :ja
  end
end
