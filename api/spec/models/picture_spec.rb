require 'rails_helper'

RSpec.describe Picture, type: :model do
  it '絵の作成' do
    @picture = create(:picture)
    expect(@picture).to be_valid
  end
end
