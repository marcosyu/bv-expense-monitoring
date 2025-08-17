# frozen_string_literal: true

module UserInteractor
  class Create
    include Interactor

    def call
      user = User.new(context.params)
      if user.save
        context.user = user
      else
        context.fail!(error: { errors: user.error_string })
      end
    end
  end
end
