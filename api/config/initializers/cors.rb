Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:8000', 'https://dapper-gaufre-086d63.netlify.app'

    resource '*',
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
