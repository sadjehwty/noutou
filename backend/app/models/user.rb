class User < ApplicationRecord
  validates :email, uniqueness: true
  validates :email, presence: true
  has_many :friendships, :foreign_key => "user_id",:class_name=>"FirendShip"
  has_many :friends, through: :friendships
  has_many :travels, through: :groups
  has_many :shares
end
