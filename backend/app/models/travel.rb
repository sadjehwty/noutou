class Travel < ApplicationRecord
  validates :name, presence: true
  belongs_to :user
  has_one :group, dependent: :destroy, autosave: true
  has_many :users, through: :group
  before_validation do |travel|
    travel.build_group if travel.group.nil?
    travel.group.users << travel.user
  end
  validates :user, inclusion: { in: :users }
end
