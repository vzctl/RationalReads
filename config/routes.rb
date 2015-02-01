Rails.application.routes.draw do
  resources :users, only: [:new]
  root "users#new"
end
