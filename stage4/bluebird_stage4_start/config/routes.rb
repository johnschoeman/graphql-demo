Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, default: {type: :json} do
    resources :users do
      resources :chirps, only: [:index]
    end

    resource :session, only: [:new, :create, :destroy]

    post '/search', to: 'users#search'

    resources :chirps
    resources :likes, only: [:create]
    delete '/likes', to: 'likes#destroy'
    resources :follows, only: [:create, :destroy]
  end
  root to: 'root#root'
end
