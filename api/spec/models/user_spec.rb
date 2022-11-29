require 'rails_helper'

RSpec.describe User, type: :model do
  it 'ユーザー作成' do
    @user = create(:user)
    expect(@user).to be_valid
  end
end
