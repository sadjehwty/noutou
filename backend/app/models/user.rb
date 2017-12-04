class User < ApplicationRecord
  validates :email, uniqueness: true
  validates :email, presence: true
  has_many :friendships, :foreign_key => "user_id", :class_name => "Friendship"
  has_many :friends, :through => :friendships
end
