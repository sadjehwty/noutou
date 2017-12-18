class User < ApplicationRecord
  validates :email, uniqueness: true, presence: true, format: { with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/ }
  has_many :friendships, foreign_key: "user_id", class_name: "Friendship", dependent: :destroy, autosave: true
  has_many :friends, through: :friendships
  has_many :journeys, source: :travels, class_name: 'Travel', dependent: :destroy
  has_and_belongs_to_many :groups
  has_many :shares, dependent: :destroy
  has_many :travels, through: :groups
  after_create do |user|
	  user.friends << user
  end
  has_secure_password
end
