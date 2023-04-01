require "rails_helper"

RSpec.describe Theme, type: :model do
  it "テーマ作成" do
    @theme = create(:theme)
    expect(@theme).to be_valid
  end

  it '重複したタイトルのテーマは作成できない' do
    Theme.create(
      title: 'サザエさん',
    )
    theme = Theme.new(
      title: 'サザエさん',
    )
    theme.valid?
    expect(theme).not_to be_valid
  end

  it 'タイトルがないとテーマとして成立しない' do
    theme = Theme.new(
      title: nil,
    )
    theme.valid?
    expect(theme).not_to be_valid
  end
end
