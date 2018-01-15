class ApplicationController < ActionController::API
  before_action :authenticate_request
  rescue_from "AccessGranted::AccessDenied" do |exception|
    render json: { error: 'Forbidden' }, status: 403
  end
  
  attr_reader :current_user
  attr_reader :current_session

  private
  def authenticate_request
    TokenCleanupJob.perform_later
    #@current_session ||= Session.from_jwt(request.headers)
    @current_session = Session.first
    @current_user ||= @current_session.user
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
