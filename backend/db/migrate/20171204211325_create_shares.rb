class CreateShares < ActiveRecord::Migration[5.1]
  def change
    create_table :shares do |t|
      t.references :cost, foreign_key: true
      t.decimal :value
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
