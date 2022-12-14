class ThemeSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at
  has_many :pictures

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

end
