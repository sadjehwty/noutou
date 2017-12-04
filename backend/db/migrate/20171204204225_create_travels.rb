class CreateTravels < ActiveRecord::Migration[5.1]
  def change
    create_table :travels do |t|
      t.string :name
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
