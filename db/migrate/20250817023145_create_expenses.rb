class CreateExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses, id: :uuid do |t|
      t.string :title
      t.decimal :amount
      t.date :date
      t.string :category

      t.timestamps
    end
  end
end
