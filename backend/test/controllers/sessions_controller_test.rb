require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should create session" do
    get users_url, as: :json
    assert_response :success
  end

end
