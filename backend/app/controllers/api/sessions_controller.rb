class SessionsController < ApplicationController
  skip_before_action :authenticate_request, except: :destroy

  # POST /sessions
  def create
    session = Session.authenticate request.env['omniauth.auth']
    if session && session.to_jwt
      render json: { auth_token: session.to_jwt }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  # DELETE /sessions/1
  def destroy
    @current_session.destroy
  end

  private
    # Only allow a trusted parameter "white list" through.
    def session_params
      params.require(:session).permit(:user_id, :oauth_token, :oauth_expires_at)
    end
end
