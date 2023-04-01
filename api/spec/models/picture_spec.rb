require "rails_helper"

RSpec.describe Picture, type: :model do
  before do
    @user = create(:user)
    @theme = create(:theme)
  end

  it "絵の作成" do
    @picture = create(:picture)
    expect(@picture).to be_valid
  end

  it "すべてのカラムが揃ってい他場合、適切に保存できること" do
    picture = Picture.new(
      image: 'adsfaaevfafgaergaerverg',
      twitter_card: 'base64.png',
      theme_id: @theme.id,
      user_id: @user.id
    )
    picture.valid?
    expect(picture).to be_valid
  end

  it 'imageカラムがない場合に保存ができないこと' do
    picture = Picture.new(
      image: nil,
      twitter_card: 'base64.png',
      theme_id: @theme.id,
      user_id: @user.id
    )
    picture.valid?
    expect(picture).not_to be_valid
  end

  it 'テーマを選択しなければ、保存ができないこと' do
    picture = Picture.new(
      image: 'adsfaaevfafgaergaerverg',
      twitter_card: 'base64.png',
      theme_id: nil,
      user_id: @user.id
    )
    picture.valid?
    expect(picture).not_to be_valid
  end

  it '削除ができること' do
    picture = Picture.new(
      image: 'adsfaaevfafgaergaerverg',
      twitter_card: 'base64.png',
      theme_id: @theme.id,
      user_id: nil, 
    )
    picture.valid?
    expect(picture).not_to be_valid
  end
end
