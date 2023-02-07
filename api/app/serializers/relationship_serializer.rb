class RelationshipSerializer < ActiveModel::Serializer
  attributes %i[id follower_id followed_id]
end
