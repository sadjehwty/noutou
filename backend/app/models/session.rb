class Session < ApplicationRecord
  belongs_to :user, :autosave => true
  def to_jwt
  end
end
