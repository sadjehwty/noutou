class Cost < ApplicationRecord
  validates :name, presence: true
  belongs_to :travel
  has_many :shares, dependent: :destroy, autosave: true
  
  def total
    shares.reduce(0) do |value,share|
      value+share.value
    end
  end
  
  def average
    shares.count > 0 ? total / shares.count : 0
  end
  
  def as_json(options={})
      super({include: :travel})
    end
end
