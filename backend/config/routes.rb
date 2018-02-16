Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'api/sessions#success', controller: 'api/sessions'
  get 'auth/failure', to: 'api/sessions#failure', controller: 'api/sessions'
  namespace :api do
    resources :sessions, only: [:destroy] do
      get 'keys', on: :collection
    end
    resources :travels do
      resources :participants, shallow: true, only: [:index, :show, :create, :destroy]
      resources :costs, shallow: true do
	      resources :shares, shallow: true
      end
    end
    resources :users do
      resources :friendships, shallow: true, only: [:index, :show, :create, :destroy]
      get 'search', on: :collection
      patch 'merge', on: :member
      put 'sendmail', on: :member
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
