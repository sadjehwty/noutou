class User < ApplicationRecord
  validates :email, presence: true, format: { with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/ }
  validates :name,  presence: true
  validates :surname,  presence: true
  has_many :friendships, foreign_key: "user_id", class_name: "Friendship", dependent: :destroy, autosave: true
  has_many :friends, through: :friendships
  has_many :journeys, source: :travels, class_name: 'Travel', dependent: :destroy
  has_many :participants
  has_many :shares, dependent: :destroy
  has_many :travels, through: :participants
  has_many :sessions, dependent: :destroy
  after_create do |user|
	  user.friends << user
  end
  
  def mergable?
    !merge_code.nil?
  end
  def loggable?
    !uid.nil?
  end

  def gen_code
    o = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten
    self.merge_code = (0...128).map { o[rand(o.length)] }.join
    self.save
  end
  def merge user
    User.transaction do
      Friendship.transaction do
        Friendship.where('friend_id = ?', self.id).each do |friend|
          friend.friend_id=user.id
          friend.save
        end
      end
      Participant.transaction do
        self.participants.each do |participant|
          participant.user = user
          participant.save
        end
      end
      Share.transaction do
        self.shares.each do |share|
          share.user=user
          share.save
        end
      end
      self.destroy
    end
  end
end
