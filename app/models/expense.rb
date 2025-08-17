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
class Expense < ApplicationRecord
  belongs_to :user

  enum status: {
    drafted: "drafted",
    submitted: "submitted",
    approved: "approved",
    rejected: "rejected"
  }

  validates :title, :amount, :date, :category, :status, presence: true

  scope :expenses_for, ->(user) do
    if user.reviewer?
      where(user_id: user.id)
        .or(
          where.not(user_id: user.id).where(status: [:submitted, :accepted, :approved, :rejected])
        )
    else
      where(user_id: user.id)
    end
  end
end
