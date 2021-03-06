Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, Rails.application.secrets.facebook_app, Rails.application.secrets.facebook_secret,
    scope: 'email,public_profile', info_fields: 'email,first_name,last_name,id'
  provider :google_oauth2, Rails.application.secrets.google_app, Rails.application.secrets.google_secret,
    scope: 'email,profile',provider_ignores_state: true
end 
