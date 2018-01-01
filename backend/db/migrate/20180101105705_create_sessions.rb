class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.references :user, foreign_key: true
      t.string :oauth_token
      t.datetime :oauth_expires_at

      t.timestamps
    end
  end
end
