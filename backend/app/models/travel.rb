class Travel < ApplicationRecord
  validates :name, presence: true
  belongs_to :user
  has_many :participants, dependent: :destroy, autosave: true
  has_many :users, through: :participants
  has_many :costs, dependent: :destroy, autosave: true
  before_validation do |travel|
    travel.users<<travel.user unless travel.users.include? travel.user
  end
  validate do |travel|
    errors[:user] << 'Owner not in Travel' unless travel.users.include? travel.user
  end
  
  def total
    costs.reduce(0) do |value, cost|
      value+cost.total
    end
  end
  
def as_json(options={})
    opt=(options||{}).merge({include: :participants})
    super(opt)
  end
end
