class ThemeSerializer < ActiveModel::Serializer
  attributes %i[id title created_at]
  has_many :pictures

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :best_picture do
    object.pictures.by_recently_created.sort { |a, b| b.likes.count <=> a.likes.count }.first
  end
end
