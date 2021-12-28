class TodosController < ApplicationController
  def index
  end

  def all_todos
    completed = Todo.where(completed: true)
    uncompleted = Todo.where(completed: false)
    render json: { completed: completed, uncompleted: uncompleted }
  end
end
