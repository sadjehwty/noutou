class Share < ApplicationRecord
  validates :value, numericality: true
  belongs_to :cost
  belongs_to :user
  validates :user, inclusion: { in: cost.travel.users }
end
