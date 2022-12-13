class UserSerializer < ActiveModel::Serializer
  attributes :id
  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end
end
