FactoryBot.define do
  factory :picture do
    sequence(:image) { |n| "#{n}_image.png" }
    user
    theme
  end
end
