class Api::TravelsController < ApplicationController
  before_action :set_travel, only: [:show, :update, :destroy]

  # GET /travels
  def index
    authorize! :read, Travel
    @travels = @current_user.travels

    render json: @travels
  end

  # GET /travels/1
  def show
    authorize! :read, @travel
    render json: @travel
  end

  # POST /travels
  def create
    authorize! :create, Travel
    @travel = Travel.new(travel_params)
    @travel.user=@current_user
    
    if @travel.save
      render json: @travel, status: :created, location: @travel
    else
      render json: @travel.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /travels/1
  def update
    authorize! :update, @travel
    if @travel.update(travel_params)
      render json: @travel
    else
      render json: @travel.errors, status: :unprocessable_entity
    end
  end

  # DELETE /travels/1
  def destroy
    authorize! :destroy, @travel
    @travel.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_travel
      @travel = Travel.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def travel_params
      params.require(:travel).permit(:name, :user_id)
    end
end
