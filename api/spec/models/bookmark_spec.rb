require "rails_helper"

RSpec.describe Bookmark, type: :model do
  before do
    @user = create(:user)
    @picture = create(:picture)
  end

  it 'お気に入り登録ができること' do
    bookmark = Bookmark.new(
      user: @user,
      picture: @picture
    )
    expect(bookmark).to be_valid
  end

  it 'ユーザーがない場合に登録が失敗すること' do
    bookmark = Bookmark.new(
      user: nil, 
      picture: @picture
    )
    expect(bookmark).not_to be_valid
  end

  it '絵がない場合に登録が失敗すること' do
    bookmark = Bookmark.new(
      user: @user, 
      picture: nil 
    )
    expect(bookmark).not_to be_valid
  end
end
