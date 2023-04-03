require "rails_helper"

RSpec.describe Relationship, type: :model do
  let(:relationship) { FactoryBot.create(:relationship) }
  describe '#create' do
    context '保存できる場合' do
      it '全てのパラメータが揃っていれば保存できる' do
        expect(relationship).to be_valid
      end
    end

    context '保存できない場合' do
      it 'user_idがnilの場合は保存できない' do
        relationship.user_id = nil
        expect(relationship).not_to be_valid
      end

      it 'follow_idがnilの場合は保存できない' do
        relationship.follow_id = nil
        expect(relationship).not_to be_valid
      end
    end

    context '一意性の検証' do
      before do
        @relation = FactoryBot.create(:relationship)
        @user_1 = FactoryBot.build(:relationship)
      end

      it 'user_idとfollow_idの組み合わせは一意でなければ保存できない' do
        relation_2 = FactoryBot.build(:relationship, user_id: @relation.user_id, follow_id: @relation.follow_id)
        expect(relation_2).not_to be_valid
      end

      it 'user_idが同じでもfollow_idが違うなら保存できる' do
        relation_2 = FactoryBot.build(:relationship, user_id: @relation.user_id, follow_id: @user_1.follow_id)
        expect(relation_2).to be_valid
      end

      it 'user_idが違うならfollow_idが同じでも保存できる' do
        relation_2 = FactoryBot.build(:relationship, user_id: @user_1.user_id, follow_id: @relation.follow_id)
        expect(relation_2).to be_valid
      end
    end
  end
end
