class CreateShares < ActiveRecord::Migration[5.1]
  def change
    create_table :shares do |t|
      t.decimal :value
      t.integer :user_id

      t.timestamps
    end
  end
end
