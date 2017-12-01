class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups, id: false  do |t|
      t.belongs_to :travel_id, index: true
      t.belongs_to :user_id, index: true
    end
  end
end
