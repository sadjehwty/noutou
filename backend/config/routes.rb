Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'api/sessions#success', controller: 'api/sessions'
  get 'auth/failure', to: 'api/success#failure', controller: 'api/sessions'
  namespace :api do
    resources :sessions, only: [:destroy]
    resources :travels do
      resources :costs, shallow: true do
	      resources :shares, shallow: true
      end
    end
    resources :users do
      get 'search', on: :collection
      patch 'merge', on: :member
      put 'send', on: :member
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
