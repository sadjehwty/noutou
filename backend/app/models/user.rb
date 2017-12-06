class User < ApplicationRecord
  validates :email, uniqueness: true
  validates :email, presence: true
  has_many :friendships, :foreign_key => "user_id", :class_name => "Friendship"
  has_many :friends, :through => :friendships
  has_many :travels
  has_and_belongs_to_many :groups
  has_many :shares
  after_create do |user|
	  user.friends << user
  end
end
