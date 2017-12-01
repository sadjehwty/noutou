class Travel < ApplicationRecord
  has_many :users, through: :groups
  has_many :costs
end
