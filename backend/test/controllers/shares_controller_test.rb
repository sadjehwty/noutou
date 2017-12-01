require 'test_helper'

class SharesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @share = shares(:one)
  end

  test "should get index" do
    get shares_url, as: :json
    assert_response :success
  end

  test "should create share" do
    assert_difference('Share.count') do
      post shares_url, params: { share: { user_id: @share.user_id, value: @share.value } }, as: :json
    end

    assert_response 201
  end

  test "should show share" do
    get share_url(@share), as: :json
    assert_response :success
  end

  test "should update share" do
    patch share_url(@share), params: { share: { user_id: @share.user_id, value: @share.value } }, as: :json
    assert_response 200
  end

  test "should destroy share" do
    assert_difference('Share.count', -1) do
      delete share_url(@share), as: :json
    end

    assert_response 204
  end
end
