Rails.application.routes.draw do
  get 'home', to: 'home#show'
  resources :notes, only:[:index, :create, :update, :destroy]
end
