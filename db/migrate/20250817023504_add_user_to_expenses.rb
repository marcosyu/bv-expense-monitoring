class AddUserToExpenses < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    add_reference :expenses, :user, null: false, type: :uuid, index: { algorithm: :concurrently }
  end
end
