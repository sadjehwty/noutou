class DropGroupsUsers < ActiveRecord::Migration[5.1]
  def change
    drop_join_table :groups, :users
  end
end
