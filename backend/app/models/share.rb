class Share < ApplicationRecord
  validates :value, numericality: true
  validates :user_id, uniqueness: {scope: [:cost_id]}
  
  belongs_to :cost
  belongs_to :user
  validate do |share|
    errors[:user] << 'Share from User not in Travel' unless share.cost.travel.users.include? share.user
  end
  def as_json(options={})
    super(include: [:user, {cost: {include: :travel}}])
  end
end
