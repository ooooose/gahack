FactoryBot.define do
  factory :picture do
    sequence(:image) {|n| "#{n}_image.png" }
    sequence(:twitter_card) { |n| "#{n}_twitter_card.png" }
    user
    theme
  end
end
