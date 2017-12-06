class Group < ApplicationRecord
  belongs_to :travel
  has_and_belongs_to_many :users
  validate do |group|
	  if group.users.count > 0 && !group.users.include?(travel.user)
		  group.errors[:users] << "Group without Travel's owner"
	  end
  end
  validate do |group|
	  if group.users.any?{ |user| !group.travel.user.friends.include?(user) }
		  group.errors[:users] << "In group some users aren't your friends with Travel's owner"
	  end
  end
end
