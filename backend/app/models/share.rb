class Share < ApplicationRecord
  validates :value, numericality: true
  belongs_to :cost
  belongs_to :user
  validate do |share|
    errors[:user] << 'Share from User not in Group' unless share.cost.travel.group.users.include? share.user
  end
end
