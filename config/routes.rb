Rails.application.routes.draw do
  root "todos#index"
  get "todos/all_todos"
  put "todos/update"
  post "todos/create"
  delete "todos/delete"

  get "todos/all_tags"
  get "todos/tag/:tag", to: "todos#tag"
  post "todos/tag/create", to: "todos#createTag"
  delete "todos/tag/delete", to: "todos#deleteTag"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
