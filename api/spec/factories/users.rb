FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test_name_#{n}" }
    sequence(:email) { |n| "test_email_#{n}@example.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end
