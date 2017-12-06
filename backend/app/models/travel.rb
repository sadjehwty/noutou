class Travel < ApplicationRecord
  belongs_to :user
  has_one :group, dependent: :destroy
  has_many :users, through: :group
  after_create do |travel|
	  travel.create_group
	  travel.group.users << travel.user
  end
  validates :user, inclusion: { in: users }
end
