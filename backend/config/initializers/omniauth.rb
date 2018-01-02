Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, Rails.application.secrets.facebook_app, Rails.application.secrets.facebook_secret,
    scope: 'email,public_profile', info_fields: 'email,first_name,last_name,id'
  provider :linkedin, Rails.application.secrets.linkedin_app, Rails.application.secrets.linkedin_secret,
    scope: 'r_fullprofile r_emailaddress', fields: ['id', 'email-address', 'first-name', 'last-name']
  provider :google_oauth2, Rails.application.secrets.google_app, Rails.application.secrets.google_secret,
    scope: 'email,profile'
end 
