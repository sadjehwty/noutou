class Api::ParticipantsController < ApplicationController
  before_action :set_participant, only: [:show, :update, :destroy]

  # GET /participants
  def index
    authorize! :read, Participant
    @participants = Travel.find(params[:travel_id]).participants

    render json: @participants
  end

  # GET /participants/1
  def show
    authorize! :read, @participant
    render json: @participant
  end

  # POST /participants
  def create
    authorize! :create, Participant
    @participant = Participant.new(participant_params)

    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /participants/1
  def destroy
    authorize! :destroy, @participant
    @participant.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_participant
      @participant = Participant.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def participant_params
      params.require(:participant).permit(:travel_id, :user_id)
    end
end
