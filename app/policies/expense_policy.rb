class ExpensePolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    record.user_id == user.id
  end

  def create?
    true
  end

  def update?
    record.user_id == user.id
  end

  def destroy?
    record.user_id == user.id
  end

  def submit?
    record.user_id == user.id && record.drafted?
  end

  def approve?
    user.reviewer? && record.submitted?
  end

  def reject?
    user.reviewer? && record.submitted?
  end

  class Scope < Scope
    def resolve
      scope.where(user_id: user.id)
    end
  end
end
