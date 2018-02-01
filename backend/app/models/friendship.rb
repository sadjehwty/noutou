class Friendship < ApplicationRecord
  belongs_to :user, :foreign_key => "user_id", :class_name => "User"
  belongs_to :friend, :foreign_key => "friend_id", :class_name => "User"
  def as_json(options={})
    super(include: :friend)
  end
end
