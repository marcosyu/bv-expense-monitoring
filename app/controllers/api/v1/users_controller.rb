# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_user, only: %i[login verify]
      before_action :set_user, only: [:update]

      def index
        authorize @current_user
        render json: User.all
      end

      def create
        authorize @current_user
        result = UserInteractor::AddToSystem.call(params: user_params)
        if result.success?
          render json: { user: result.user}, status: :created
        else
          render json: result.error, status: :unprocessable_entity
        end
      end

      def update
        authorize @current_user
        if @user.update(user_params)
          render json: { message: I18n.t('generic.update.success') }, status: :ok
        else
          render json: { errors: @user.error_string }, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @current_user
        if @user.destroy
          render json: { message: I18n.t('generic.destroy.success') }, status: :ok
        else
          render json: { errors: @user.error_string }, status: :unprocessable_entity
        end
      end

      def login
        user = User.verified.find_by(email: login_params[:email])
        if user&.authenticate(login_params[:password])
          render json: {
            token:     JsonWebToken.encode(user_id: user.id),
            full_name: user.full_name
          }
        else
          render json: { errors: I18n.t('user.errors.login') }, status: :unauthorized
        end
      end

      def verify
        user = User.find_by(reset_password_token: params[:token])
        return render json: { errors: I18n.t('user.errors.verify') }, status: :not_found unless user

        user.update(reset_password_token: nil)
        render json: { success: 'Verified successfully, please login now!' }, status: :ok
      end

      private

      def set_user
        @user = User.find_by(id: params[:id])
        return render json: { error: I18n.t('user.errors.not_found') }, status: :not_found unless @user
      end

      def user_params
        params.permit(:email, :first_name, :last_name, :password)
      end

      def login_params
        params.permit!
      end
    end
  end
end
