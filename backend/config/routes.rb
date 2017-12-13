Rails.application.routes.draw do
  namespace :api do
    resources :sessions, only: [:create]
    resources :travels do
      resources :costs, shallow: true do
	resources :shares, shallow: true
      end
    end
    resources :users do
      get 'search', on: :collection
      patch 'merge', on: :member
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
