class UserMailer < ApplicationMailer
  def merge_email(user)
    @user = user
    @url  = merge_api_user_path @user
    mail(to: @user.email, subject: 'Join our service')
  end
end
