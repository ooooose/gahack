require "rails_helper"

RSpec.describe Like, type: :model do
  describe "いいねモデルを作成" do
    context "ユーザーがいいねを押した時" do
      it "いいねモデルの作成が成功すること" do
        @like = create(:like)
        expect(@like).to be_valid
      end
    end
  end

  describe "バリデーションのテスト" do
    let!(:other_like) { create(:like) }
    let(:like) { build(:like) }

    context "１ユーザーに対して１つの絵に対していいねしている場合" do
      it "同一ユーザーが同じ絵にいいねができないこと" do
        like.user = other_like.user
        like.picture = other_like.picture
        expect(like).not_to be_valid
      end
    end
  end

  describe "アソシエーションのテスト" do
    context "Userモデルとの関係" do
      it "1対多となっていること" do
        expect(Like.reflect_on_association(:user).macro).to eq :belongs_to
      end
    end

    context "Pictureモデルとの関係" do
      it "1対多となっていること" do
        expect(Like.reflect_on_association(:picture).macro).to eq :belongs_to
      end
    end
  end
end
