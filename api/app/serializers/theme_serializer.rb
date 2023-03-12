class ThemeSerializer < ActiveModel::Serializer
  attributes %i[id title]
  has_many :pictures, serializer: PictureSerializer do
    object.pictures.includes({ user: [:likes, :liked_pictures, :comments, :bookmarks, :bookmark_pictures, :followings, :followers] },
                                :theme, :likes, :liked_users, :comments, :bookmarks).recent
  end

  def initialize(object, **option)
    @current_api_v1_user = option[:current_api_v1_user]
    super
  end

  attribute :best_picture do
    object.pictures.includes({ user: [:likes, :liked_pictures, :comments, :bookmarks, :bookmark_pictures, :followings, :followers] },
                               :theme, { likes: :picture }, :liked_users, :comments, :bookmarks).recent.sort {|a, b| b.likes.count <=> a.likes.count }.first
  end
end
