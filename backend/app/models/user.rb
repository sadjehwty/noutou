class User < ApplicationRecord
  validates :email, uniqueness: true
  validates :email, presence: true
  has_many :users, through: :friends
  has_many :travels, through: :groups
  has_many :shares
end
