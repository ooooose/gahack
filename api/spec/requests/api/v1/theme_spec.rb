require "rails_helper"

RSpec.describe Theme, type: :request do
  describe "テーマ一覧画面" do
    before do
      create_list(:theme, 10)
    end

    it "テーマの一覧が表示されること" do
      get "/api/v1/themes"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.length).to eq(10)
    end
  end

  describe "テーマ詳細画面" do
    before do
      @theme = create(:theme)
    end

    it "テーマの詳細が表示されること" do
      get "/api/v1/themes/#{@theme.id}"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json["title"]).to eq(@theme.title)
    end
  end
end
