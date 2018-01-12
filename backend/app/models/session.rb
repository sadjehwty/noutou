class Session < ApplicationRecord
  belongs_to :user, :autosave => true
  def self.authenticate auth
    user=User.where('provider = ? and uid = ?',auth.provider,auth.uid).first
    user=User.create({
      name: auth.info.first_name,
      surname: auth.info.last_name,
      email: auth.info.email,
      provider: auth.provider,
      uid: auth.uid
    }) if user.nil?
    user.sessions.create({
      oauth_token: auth.credentials.token,
      oauth_expires_at: Time.at(auth.credentials.expires_at)
    })
  end
  def to_jwt
    if self.user
      JsonWebToken.encode({uid: self.user.uid, prv: self.user.provider, tkn: self.oauth_token}, self.oauth_expires_at)
    else
      errors.add :user_authentication, 'invalid credentials'
    end
  end
  def self.from_jwt headers
    if headers['Authorization'].present?
      token ||= headers['Authorization'].split(' ').last
      decoded_auth_token ||= JsonWebToken.decode(token)
      session ||= Session.joins(:user).where('users.uid = ? and users.provider = ? and oauth_token = ?',decoded_auth_token[:uid], decoded_auth_token[:prv],decoded_auth_token[:tkn]).first if decoded_auth_token
      session || errors.add(:token, 'Invalid token') && nil
    else
      errors.add :token, 'Missing token'
    end
  end
end
