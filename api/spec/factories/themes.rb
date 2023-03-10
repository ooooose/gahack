FactoryBot.define do
  factory :theme do
    sequence(:title) {|n| "title#{n}" }
  end
end
