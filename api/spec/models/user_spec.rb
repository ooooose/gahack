require "rails_helper"

RSpec.describe User, type: :model do
  it "ユーザー作成" do
    @user = create(:user)
    expect(@user).to be_valid
  end

  it "名前・メール・パスワードがあれば有効な状態であること" do
    user = User.new(
      name: "Oose",
      email: "oose@example.com",
      password: "suuretu0524",
      password_confirmation: "suuretu0524",
    )
    expect(user).to be_valid
  end

  it "名前がなければ無効な状態であること" do
    user = User.new(
      name: nil,
      email: "oose@example.com",
      password: "suuretu0524",
      password_confirmation: "suuretu0524",
    )
    user.valid?
    expect(user).not_to be_valid
  end

  it "重複したメールアドレスなら無効となること" do
    User.create(
      name: "Oose",
      email: "oose@example.com",
      password: "suuretu0524",
      password_confirmation: "suuretu0524",
    )

    user = User.new(
      name: "Yuuki",
      email: "oose@example.com",
      password: "suuretu0524",
      password_confirmation: "suuretu0524",
    )
    user.valid?
    expect(user).not_to be_valid
  end
end
