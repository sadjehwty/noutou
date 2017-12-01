class AddCostToShares < ActiveRecord::Migration[5.1]
  def change
    add_column :shares, :cost_id, :integer
    add_index :shares, :cost_id
  end
end
