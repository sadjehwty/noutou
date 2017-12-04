class CreateFriendships < ActiveRecord::Migration[5.1]
  def change
    create_table :friendships do |t|
      t.references :user, foreign_key: true
      t.belongs_to :friend_id, index: true

      t.timestamps
    end
  end
end
