# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    user.reviewer?
  end

  def create?
    user.reviewer?
  end

  def update?
    user.id == record.id || user.reviewer?
  end

  def destroy?
    user.reviewer?
  end
end
