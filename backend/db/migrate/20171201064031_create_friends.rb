class CreateFriends < ActiveRecord::Migration[5.1]
  def change
    create_table :friends, id: false  do |t|
      t.belongs_to :user_id, index: true
      t.belongs_to :friend_id, index: true
    end
  end
end
