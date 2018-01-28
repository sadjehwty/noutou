class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_request, except: :destroy

  # POST /auth/:provider/callback
  def success
    session = Session.authenticate request.env['omniauth.auth']
    if session && session.to_jwt
      render json: { auth_token: session.to_jwt }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
  # GET /auth/failure
  def failure
    render json: { error: 'Not Authorized' }, status: 401
  end
  
  # GET /sessions/keys
  def keys
    render json: { facebook: Rails.application.secrets.facebook_app, google: Rails.application.secrets.google_app, windows: Rails.application.secrets.windows_app }
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
