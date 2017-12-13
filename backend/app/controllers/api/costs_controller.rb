class Api::CostsController < ApplicationController
  before_action :set_cost, only: [:show, :update, :destroy]

  # GET /costs
  def index
    @costs = Cost.all

    render json: @costs
  end

  # GET /costs/1
  def show
    render json: @cost
  end

  # POST /costs
  def create
    @cost = Cost.new(cost_params)

    if @cost.save
      render json: @cost, status: :created, location: @cost
    else
      render json: @cost.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /costs/1
  def update
    if @cost.update(cost_params)
      render json: @cost
    else
      render json: @cost.errors, status: :unprocessable_entity
    end
  end

  # DELETE /costs/1
  def destroy
    @cost.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cost
      @cost = Cost.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def cost_params
      params.require(:cost).permit(:name, :when, :travel_id)
    end
end
