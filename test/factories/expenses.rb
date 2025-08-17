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
#  user_id    :uuid             not null
#
# Indexes
#
#  index_expenses_on_user_id  (user_id)
#
FactoryBot.define do
  factory :expense do
    title { "MyString" }
    amount { "9.99" }
    date { "2025-08-17" }
    category { "MyString" }
  end
end
