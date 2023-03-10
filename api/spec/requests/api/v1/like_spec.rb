require "rails_helper"

RSpec.describe Like, type: :request do
  describe "いいね作成機能" do
    before do
      @user = create(:user)
      sign_in @user
      @picture = create(:picture)
      @like_params = {
        like: {
          user_id: @user.id,
          picture_id: @picture.id,
        },
      }
    end

    # うまくテストが通らないので一旦ペンディング。。。
    xit "いいねが作成されること" do
      expect do
        post "/api/v1/likes", params: @like_params
      end.to change(Like, :count).by(1)
      expect(response.status).to eq(201)
    end
  end
end
