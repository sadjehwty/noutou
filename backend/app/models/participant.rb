class Participant < ApplicationRecord
  belongs_to :travel
  belongs_to :user

=begin
# questi non hanno più senso qui
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
=end
  def amount
    user.shares.joins(:cost).where('costs.travel_id = ?', travel.id).reduce(0) do |value, share|
      value+share.cost.average-share.value
    end
  end
  def as_json(options={})
    opt=(options||{}).merge({include: :users})
    super(opt).merge({
            :methods => [:amount]
        })
  end
end
