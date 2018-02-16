Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :user, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end