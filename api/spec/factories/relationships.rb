FactoryBot.define do
  factory :relationship do
    user_id { FactoryBot.create(:user).id }
    follow_id { FactoryBot.create(:user).id }
  end
end
