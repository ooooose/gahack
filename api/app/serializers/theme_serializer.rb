class ThemeSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at

  has_many :pictures
end
