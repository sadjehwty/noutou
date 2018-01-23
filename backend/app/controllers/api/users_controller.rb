class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :merge, :send]

  # GET /users
  def index
    authorize! :read, User
    @users = @current_user.friends.where('users.id <> ?', @current_user.id)

    render json: @users
  end

  # GET /users/1
  def show
    authorize! :read, @user
    render json: @user
  end

  # POST /users
  def create
    authorize! :create, User
    @user = User.new(user_params)
    @current_user.friends << @user
    
    if @user.save && @current_user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    authorize! :update, @user
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    authorize! :destroy, @user
    @user.destroy
  end
  
  # PUT /users/1/sendmail
  def sendmail
    authorize! :sendmail, @user
    if @user.gen_code
      UserMailer.merge_email(@user).deliver_later
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  # PATCH /users/1/merge
  def merge
    authorize! :merge, @user
    @user.merge @current_user
  end
  
  # GET /users/search
  def search
    authorize! :read, User
    cond = "%#{params[:query]}%"
    if params[:travel_id]
      @users = User.joins("LEFT JOIN participants ON(participants.travel_id = #{params[:travel_id].to_i} AND participants.user_id = users.id)").where("(name like ? OR surname like ? OR nickname like ?) and users.id <> ? and participants.id is null", cond, cond, cond, @current_user.id)
    else
      @users = User.where("(name like ? OR surname like ? OR nickname like ?) and id <> ?", cond, cond, cond, @current_user.id)
    end
    
    render json: @users
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :surname, :nickname, :email)
    end
end
