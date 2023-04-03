require "rails_helper"

RSpec.describe Like, type: :request do
  describe "いいね作成機能" do
    before do
      @user = FactoryBot.create(:user)
      sign_in @user
      @picture = create(:picture)
      @like_params = {
        user_id: @user.id,
        picture_id: @picture.id,
      }
    end

    xit "いいねが作成されること" do
      expect {
        post "/api/v1/likes", params: @like_params
      }.to change(@user.likes, :count).by(1)
      expect(response).to have_http_status(:success)
    end
  end
end
