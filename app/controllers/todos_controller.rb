class TodosController < ApplicationController
  def index
  end

  def all_todos
    completed = Todo.where(completed: true)
    uncompleted = Todo.where(completed: false).order(:id)
    render json: { completed: completed, uncompleted: uncompleted }
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      render json: { message: "Todo Item updated successfully" }
    else
      render json: { message: "An error occured" }
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:id, :title, :completed)
  end
end
