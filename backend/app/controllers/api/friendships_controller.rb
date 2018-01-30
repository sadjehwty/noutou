class Api::FriendshipsController < ApplicationController
  before_action :set_friendship, only: [:show, :update, :destroy]
  
  # GET /friendships
  def index
    authorize! :read, Friendship
    @friendships = Friendship.where('user_id = ? and friend_id <> ?', @current_user.id, @current_user.id)
    
    render json: @friendships
  end
  
  # GET /friendships/1
  def show
    authorize! :read, @friendship
    render json: @friendship
  end
  
  # POST /friendships
  def create
    authorize! :create, Participant
    @friendship = Friendship.new(friendship_params)
    
    if @friendship.save
      render json: @friendship, status: :created
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end
  
  # DELETE /friendships/1
  def destroy
    authorize! :destroy, @friendship
    @friendship.destroy
  end
  
  private
  # Use callbacks to share common setup or constraints between actions.
  def set_friendship
    @friendship = Friendship.find(params[:id])
  end
  
  # Only allow a trusted parameter "white list" through.
  def friendship_params
    params.require(:friendship).permit(:friend_id, :user_id)
  end
end
