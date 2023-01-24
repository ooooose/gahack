FactoryBot.define do
  factory :comment do
    body { "MyString" }
    user { nil }
    picture { nil }
  end
end
