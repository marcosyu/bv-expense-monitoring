# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      email: "test@example.com",
      password: "password123",
      first_name: "John",
      last_name: "Doe"
    )
  end

  test "valid user" do
    assert @user.valid?
  end

  test "email must be present" do
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors[:email], "can't be blank"
  end

  test "email must be unique" do
    @user.save!
    duplicate = @user.dup
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:email], "has already been taken"
  end

  test "password must be at least 8 characters" do
    @user.password = "short"
    assert_not @user.valid?
    assert_includes @user.errors[:password], "is too short (minimum is 8 characters)"
  end

  test "default role is employee" do
    user = User.create!(email: "another@example.com", password: "password123")
    assert_equal "employee", user.role
    assert user.employee?
    assert_not user.reviewer?
  end

  test "enum role reviewer" do
    @user.role = :reviewer
    assert_equal "reviewer", @user.role
    assert @user.reviewer?
  end

  test "full_name returns first + last name" do
    assert_equal "John Doe", @user.full_name
  end

  test "verified scope excludes users with reset_password_token" do
    verified_user = User.create!(
      email: "verified@example.com",
      password: "password123"
    )

    unverified_user = User.create!(
      email: "unverified@example.com",
      password: "password123",
      reset_password_token: "sometoken"
    )

    assert_includes User.verified, verified_user
    assert_not_includes User.verified, unverified_user
  end
end
