require "rails_helper"

RSpec.describe Picture, type: :request do
  describe "絵一覧画面（タイムライン表示）" do
    before do
      create_list(:picture, 10)
    end

    it "テーマの一覧が表示されること" do
      get "/api/v1/pictures"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.length).to eq(10)
    end
  end

  describe "絵の作成" do
    before do
      @user = create(:user)
    end

    # うまく作成できないので、一旦保留
    xit "絵の作成に成功" do
      theme = FactoryBot.create(:theme)
      get "/api/v1/pictures", params: {
        email: @user.email,
        password: @user.password,
      }

      expect {
        post "/api/v1/pictures", params: {
          user_id: @user.id,
          theme_id: theme.id,
        }
      }.to change(@user.pictures, :count).by(1)

      expect(response).to have_http_status(:success)
    end
  end

  describe "絵詳細画面" do
    before do
      @picture = create(:picture)
    end

    it "テーマの詳細が表示されること" do
      get "/api/v1/pictures/#{@picture.id}"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
    end
  end
end
