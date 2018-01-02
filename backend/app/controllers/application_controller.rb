class ApplicationController < ActionController::API
  before_action :authenticate_request
  rescue_from "AccessGranted::AccessDenied" do |exception|
    render json: { error: 'Forbidden' }, status: 403
  end
  
  attr_reader :current_user

  private
  def authenticate_request
    TokenCleanupJob.perform_later
    @current_user = AuthenticateApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
