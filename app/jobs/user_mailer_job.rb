# frozen_string_literal: true

class UserMailerJob < ApplicationJob
  queue_as :default

  discard_on StandardError

  def perform(user)
    UserVerificationMailer.verify(user).deliver_now
  end
end
