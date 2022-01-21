class TodosController < ApplicationController
  def index
  end

  def all_todos
    completed = Todo.where(completed: true)
    uncompleted = Todo.where(completed: false).order(:id)
    render json: { completed: completed, uncompleted: uncompleted }
  end

  def all_tags
    tags = Category.all
    render json: { tags: tags }
  end

  def tag
    completed = Todo.where(tag: params[:tag]).where(completed: true)
    uncompleted = Todo.where(tag: params[:tag]).where(completed: false)
    render json: { completed: completed, uncompleted: uncompleted }
  end

  def createTag
    new_tag = Category.create!(tag_params)
    if new_tag
      render json: { message: "Tag created successfully" }
    else
      render json: { message: "An error occured" }
    end
  end

  def deleteTag
    @category = Category.find(params[:id])
    @category.destroy
    render json: { message: "Deleted" }
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      render json: { message: "Todo Item updated successfully" }
    else
      render json: { message: "An error occured" }
    end
  end

  def create
    new_todo = Todo.create!(todo_params)
    if new_todo
      render json: { message: "Todo Item created successfully" }
    else
      render json: { message: "An error occured" }
    end
  end

  def delete
    @todo = Todo.find(params[:id])
    @todo.destroy
    render json: { message: "Deleted" }
  end

  private

  def todo_params
    params.require(:todo).permit(:id, :title, :completed, :tag, :created_at, :updated_at)
  end

  def tag_params
    params.permit(:tag)
  end
end
