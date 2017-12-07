require 'test_helper'

class SessionControllerTest < ActionDispatch::IntegrationTest
  test "should get jwt" do
    get session_jwt_url
    assert_response :success
  end

end
