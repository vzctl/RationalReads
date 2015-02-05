Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  resources :ratings, only: [:create, :update], defaults: { format: :json }
  resources :comments, only: [:create, :update], defaults: { format: :json }
  
  namespace :api, defaults: {format: :json } do
    resources :works, only: [:create, :show, :index]
  end
end
