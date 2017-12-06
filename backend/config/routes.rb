Rails.application.routes.draw do
  resources :shares
  resources :costs
  resources :travels
  resources :users do
    get 'search', on: :collection
    patch 'merge', on: :member
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
