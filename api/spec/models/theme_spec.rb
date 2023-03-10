require "rails_helper"

RSpec.describe Theme, type: :model do
  it "テーマ作成" do
    @theme = create(:theme)
    expect(@theme).to be_valid
  end
end
