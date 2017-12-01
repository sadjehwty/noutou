require 'test_helper'

class CostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cost = costs(:one)
  end

  test "should get index" do
    get costs_url, as: :json
    assert_response :success
  end

  test "should create cost" do
    assert_difference('Cost.count') do
      post costs_url, params: { cost: { name: @cost.name, travel_id: @cost.travel_id, when: @cost.when } }, as: :json
    end

    assert_response 201
  end

  test "should show cost" do
    get cost_url(@cost), as: :json
    assert_response :success
  end

  test "should update cost" do
    patch cost_url(@cost), params: { cost: { name: @cost.name, travel_id: @cost.travel_id, when: @cost.when } }, as: :json
    assert_response 200
  end

  test "should destroy cost" do
    assert_difference('Cost.count', -1) do
      delete cost_url(@cost), as: :json
    end

    assert_response 204
  end
end
