class CreateCosts < ActiveRecord::Migration[5.1]
  def change
    create_table :costs do |t|
      t.string :name
      t.datetime :when
      t.references :travel, foreign_key: true

      t.timestamps
    end
  end
end
