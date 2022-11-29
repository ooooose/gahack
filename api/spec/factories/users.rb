FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test_name#{n}" }
    sequence(:email) { |n| "test_email#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
