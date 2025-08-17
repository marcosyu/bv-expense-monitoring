# test/controllers/api/v1/users_controller_test.rb
require "test_helper"

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @employee = create(:user, role: "employee")
    @reviewer = create(:user, role: "reviewer")
    employee_jwt_token = JsonWebToken.encode(user_id: @employee.id)
    reviewer_jwt_token = JsonWebToken.encode(user_id: @reviewer.id)
    @api_header = { "X-Api-Token" => Rails.application.credentials.api_token }
    @reviewer_auth_header = @api_header.merge("Authorization" => "Bearer #{reviewer_jwt_token}")
    @employee_auth_header = @api_header.merge("Authorization" => "Bearer #{employee_jwt_token}")
  end

  test "require jwt token from a reviewer and show all users" do
    get api_v1_users_url, headers: @reviewer_auth_header
    assert_response :success
  end

  test "require jwt token from a reviewer and calls the interactor" do
    new_user_params = {
      email: "new@example.com",
      first_name: "New",
      last_name: "User",
      password: "password",
      role: "employee"
    }

    UserInteractor::AddToSystem.expects(:call).returns(OpenStruct.new(success?: true, user: @employee))

    post api_v1_users_url,
        params: new_user_params,
        headers: @reviewer_auth_header

    assert_response :created
  end

  test "require jwt token from the user owner and expect update call" do
    User.expects(:find_by).returns(@employee)
    @employee.expects(:update).returns(true)
    patch api_v1_user_url(@employee),
          params: { user: { first_name: "Updated" } },
          headers: @employee_auth_header
    assert_response :success
  end

  test "should login user" do
    User.expects(:verified).returns(User)
    User.expects(:find_by).with(email: @employee.email).returns(@employee)
    @employee.expects(:authenticate).returns(true)
    post login_api_v1_users_url,
         params: { email: @employee.email, password: "password" },
         headers: @employee_auth_header
    assert_response :success
    assert_includes @response.parsed_body, "token"
  end
end
