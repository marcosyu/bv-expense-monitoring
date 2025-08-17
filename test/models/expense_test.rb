# == Schema Information
#
# Table name: expenses
#
#  id         :uuid             not null, primary key
#  amount     :decimal(, )
#  category   :string
#  date       :date
#  status     :string           default("drafted"), not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_expenses_on_user_id  (user_id)
#
require "test_helper"

class ExpenseTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
