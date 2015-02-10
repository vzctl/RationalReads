Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  resources :ratings, only: [:create, :update], defaults: { format: :json }
  resources :comments, only: [:create, :update], defaults: { format: :json }
  resources :chapters, only: [:create]

  namespace :api, defaults: { format: :json } do
    resources :works, only: [:create, :show, :index] do
    end
  end
end
