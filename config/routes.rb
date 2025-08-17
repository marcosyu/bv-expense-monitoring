# frozen_string_literal: true

# == Route Map
#

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :expenses
      resources :users, except: %i[show new edit] do
        post :login, on: :collection
      end
    end
  end
end
