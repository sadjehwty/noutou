require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should post jwt" do
    get sessions_jwt_url
    assert_response :success
  end

end
