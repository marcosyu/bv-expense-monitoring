# frozen_string_literal: true

# app/controllers/api/v1/expenses_controller.rb
module Api
  module V1
    class ExpensesController < ApplicationController
      before_action :set_expense, only: %i[show update destroy submit approve reject]
      before_action :authorize_expense, only: %i[update destroy submit approve reject]

      def index
        expenses = current_user.expenses
        render json: expenses
      end

      def show
        render json: @expense
      end

      def create
        expense = current_user.expenses.build(expense_params)
        if expense.save
          render json: expense, status: :created
        else
          render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @expense.update(expense_params)
          render json: @expense
        else
          render json: { errors: @expense.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @expense.destroy
        head :no_content
      end

      def submit
        if @expense.drafted?
          @expense.update!(status: :submitted)
          render json: @expense
        else
          render json: { error: "Only drafted expenses can be submitted" }, status: :unprocessable_entity
        end
      end

      def approve
        if @expense.submitted?
          @expense.update!(status: :approved)
          render json: @expense
        else
          render json: { error: "Only submitted expenses can be approved" }, status: :unprocessable_entity
        end
      end

      def reject
        if @expense.submitted?
          @expense.update!(status: :rejected)
          render json: @expense
        else
          render json: { error: "Only submitted expenses can be rejected" }, status: :unprocessable_entity
        end
      end

      private

      def set_expense
        @expense = Expense.find(params[:id])
      end

      def authorize_expense
        authorize @expense
      end

      def expense_params
        params.require(:expense).permit(:title, :amount, :date, :category)
      end
    end
  end
end
