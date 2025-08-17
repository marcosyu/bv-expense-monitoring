class AddStateOnExpenses < ActiveRecord::Migration[7.0]
  def change
     add_column :expenses, :status, :string, default: "drafted", null: false
  end
end
