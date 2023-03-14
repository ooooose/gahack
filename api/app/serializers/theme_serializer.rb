class ThemeSerializer < ActiveModel::Serializer
  attributes %i[id title]
  has_many :pictures, serializer: PictureSerializer

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :best_picture do
    object.pictures.joins(:likes).group(:picture_id).order('count(picture_id) desc').first
  end
end
