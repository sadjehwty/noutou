class SessionsController < ApplicationController
  skip_before_action :authenticate_request, except: :destroy
  before_action :set_session, only: :destroy

  # POST /sessions
  def create
    user = User.authenticate request.env['omniauth.auth']
    if user && (command = AuthenticateUser.call(user.uid, user.provider)) && command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  # DELETE /sessions/1
  def destroy
    @session.destroy
=begin
    @current_user.oauth_token = nil
    @current_user.save
=end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session
      @session = Session.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def session_params
      params.require(:session).permit(:user_id, :oauth_token, :oauth_expires_at)
    end
end
