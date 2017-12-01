class Share < ApplicationRecord
  belongs_to :cost
  belongs_to :user
end
