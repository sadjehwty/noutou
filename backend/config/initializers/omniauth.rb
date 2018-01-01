Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, Rails.application.secrets.facebook_app, Rails.application.secrets.facebook_secret,
    scope: 'email,public_profile', info_fields: 'email,first_name,last_name,id'
end 
