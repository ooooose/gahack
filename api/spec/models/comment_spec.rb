require "rails_helper"

RSpec.describe Comment, type: :model do
  before do
    @user = create(:user)
    @picture = create(:picture)
  end
  
  it 'ユーザーが絵に対してコメントを入力できること' do
    comment = Comment.new(
      body: 'comment',
      user: @user,
      picture: @picture
    )
    expect(comment).to be_valid
  end

  it 'ユーザー情報がない場合、コメントが作成できないこと' do
    comment = Comment.new(
      body: 'comment',
      user: nil,
      picture: @picture
    )
    expect(comment).not_to be_valid
  end

  it '絵の情報がない場合、コメントが作成できないこと' do
    comment = Comment.new(
      body: 'comment',
      user: @user,
      picture: nil, 
    )
    expect(comment).not_to be_valid
  end

  it 'コメント内容がない場合、コメントの作成ができないこと' do
    comment = Comment.new(
      body: nil,
      user: @user,
      picture: @picture
    )
    expect(comment).not_to be_valid
  end
end
