class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image
  has_many :pictures

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :pictures do
    object.pictures
  end
end
