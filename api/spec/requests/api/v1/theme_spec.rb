require 'rails_helper'

RSpec.describe Theme, type: :request do
  describe 'テーマ一覧画面' do
    before do
      create_list(:theme, 10)
    end

    it 'テーマの一覧が表示されること' do
      get "/api/v1/themes"
      expect(response.status).to eq(200)
      expect(json.length).to eq(Theme.count)
    end
  end

  describe 'テーマ詳細画面' do
    before do
      @theme = create(:theme)
    end

    it 'テーマの詳細が表示されること' do
      get "/api/v1/themes/#{@theme.id}"
      expect(response.status).to eq(200)
      expect(json['theme']['title']).to eq(@theme.title)
    end
  end

  describe 'テーマ作成機能' do
    before do
      @theme_create_params = {
        theme: {
          title: "theme_title"
        }
      }
    end

    it 'テーマが作成されること' do
      expect do
        post "/api/v1/themes", params: @theme_create_params
        expect(response.status).to eq(201)
      end.to change {Theme.count}.by(1)
    end
  end
end
