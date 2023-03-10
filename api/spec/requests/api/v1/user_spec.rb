require "rails_helper"

RSpec.describe User, type: :request do
  describe "GET /users" do
    before do
      create_list(:user, 10)
    end

    # まだアクションを作れていないので、一旦ペンディング
    xit "ユーザー一覧取得" do
      get "/api/v1/users"
      # responseの可否判定について確認
      expect(response.status).to eq(200)
      expect(json.length).to eq(User.count)
    end
  end

  describe "GET /user/id" do
    before do
      @user = create(:user)
    end

    # showアクションを作っていないので、一旦ペンディング
    xit "特定ユーザー取得" do
      get "/api/v1/user/#{@user.id}"
      # responseの可否判定について確認
      expect(json["email"]).to eq(@user.email)
    end
  end
end
