module IdGenerator
  def self.included(klass)
    klass.before_action :fill_id
  end

  def fill_in
    self.id = loop do
      uuid = SecureRandom.uuid
      break uuid unless self.class.exists?(id: uuid)
    end
  end
end
