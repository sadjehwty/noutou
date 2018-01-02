class TokenCleanupJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Session.where('oauth_expires_at < ?', Time.now).each do |sess|
      sess.destroy
    end
  end
end
