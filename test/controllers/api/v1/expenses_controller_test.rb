# require "test_helper"

# class Api::V1::ExpensesControllerTest < ActionDispatch::IntegrationTest
#   setup do
#     @user = users(:regular)
#     @other_user = users(:other)
#     @expense = expenses(:drafted)
#     sign_in @user
#   end

#   test "should get index only for current user" do
#     get api_v1_expenses_url
#     assert_response :success
#     json = JSON.parse(response.body)
#     assert json.all? { |e| e["user_id"] == @user.id }
#   end

#   test "should create expense" do
#     assert_difference("@user.expenses.count") do
#       post api_v1_expenses_url, params: {
#         expense: { title: "Test", amount: 100, date: Date.today, category: "Food" }
#       }
#     end
#     assert_response :created
#   end

#   test "submit drafted expense" do
#     post submit_api_v1_expense_url(@expense)
#     assert_response :success
#     assert_equal "submitted", @expense.reload.status
#   end

#   test "cannot submit already submitted expense" do
#     @expense.update!(status: :submitted)
#     post submit_api_v1_expense_url(@expense)
#     assert_response :unprocessable_entity
#   end

#   test "approve submitted expense" do
#     @expense.update!(status: :submitted)
#     post approve_api_v1_expense_url(@expense)
#     assert_response :success
#     assert_equal "approved", @expense.reload.status
#   end

#   test "reject submitted expense" do
#     @expense.update!(status: :submitted)
#     post reject_api_v1_expense_url(@expense)
#     assert_response :success
#     assert_equal "rejected", @expense.reload.status
#   end

#   test "cannot approve drafted expense" do
#     post approve_api_v1_expense_url(@expense)
#     assert_response :unprocessable_entity
#   end

#   test "cannot modify another user's expense" do
#     other_expense = expenses(:other_users_drafted)
#     assert_raises(Pundit::NotAuthorizedError) do
#       patch api_v1_expense_url(other_expense), params: { expense: { title: "Hack" } }
#     end
#   end
# end
