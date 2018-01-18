class CreateParticipants < ActiveRecord::Migration[5.1]
  def change
    create_table :participants do |t|
      t.references :travel, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
