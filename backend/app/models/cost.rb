class Cost < ApplicationRecord
  belongs_to :travel
  has_many :shares, dependent: :destroy, autosave: true
end
