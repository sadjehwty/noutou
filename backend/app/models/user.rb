class User < ApplicationRecord
  validates :email, uniqueness: true, presence: true, format: { with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/ }
  has_many :friendships, foreign_key: "user_id", class_name: "Friendship", dependent: :destroy
  has_many :friends, through: :friendships
  has_many :travels, dependent: :destroy
  has_and_belongs_to_many :groups
  has_many :shares, dependent: :destroy
  after_create do |user|
	  user.friends << user
  end
end
