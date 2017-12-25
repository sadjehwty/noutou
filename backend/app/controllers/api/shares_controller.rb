class Api::SharesController < ApplicationController
  before_action :set_share, only: [:show, :update, :destroy]

  # GET /shares
  def index
    authorize! :read, Share
    @shares = Cost.find(params[:id]).shares

    render json: @shares
  end

  # GET /shares/1
  def show
    authorize! :read, @share
    render json: @share
  end

  # POST /shares
  def create
    authorize! :create, Share
    @share = Share.new(share_params)

    if @share.save
      render json: @share, status: :created
    else
      render json: @share.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shares/1
  def update
    authorize! :update, @share
    if @share.update(share_params)
      render json: @share
    else
      render json: @share.errors, status: :unprocessable_entity
    end
  end

  # DELETE /shares/1
  def destroy
    authorize! :destroy, @share
    @share.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_share
      @share = Share.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def share_params
      params.require(:share).permit(:cost_id, :value, :user_id)
    end
end
