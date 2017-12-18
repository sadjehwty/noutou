class AddMergeCodeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :merge_code, :string
  end
end
