# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
users_data = [
  { email: "marcos@exmon.com", first_name: "Marcos", last_name: "Yu", role: :reviewer, password: 'password' },
  { email: "ken@exmon.com", first_name: "Ken Zion", last_name: "Yu", role: :employee, password: 'password' }
]

users_data.each do |user_attrs|
  User.find_or_create_by(email: user_attrs[:email]) do |user|
    user.first_name = user_attrs[:first_name]
    user.last_name  = user_attrs[:last_name]
    user.role       = user_attrs[:role]
    user.password   = user_attrs[:password]
  end
end
