class Travel < ApplicationRecord
  belongs_to :user
  has_one :group
  has_many :users, through: :group
end
