class AuthenticateUser
  prepend SimpleCommand

  def initialize(uid, provider)
    @uid = uid
    @provider = provider
  end

  def call
    JsonWebToken.encode({uid: user.uid, prv: user.provider, tkn: user.oauth_token}, user.oauth_expires_at) if user
  end

  private
  attr_accessor :uid, :provider

  def user
    user = User.join(:sessions).where('uid = ? and provider = ? and sessions.oauth_token is not null',@uid, @provider).first
    return user if user
    errors.add :user_authentication, 'invalid credentials'
    nil
  end
end
