class CreateCosts < ActiveRecord::Migration[5.1]
  def change
    create_table :costs do |t|
      t.string :name
      t.datetime :when
      t.integer :travel_id

      t.timestamps
    end
    add_index :costs, :travel_id
  end
end
