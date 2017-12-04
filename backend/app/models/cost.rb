class Cost < ApplicationRecord
  belongs_to :travel
  has_many :shares
end
