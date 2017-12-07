class Cost < ApplicationRecord
  validates :name, presence: true
  belongs_to :travel
  has_many :shares, dependent: :destroy, autosave: true
end
