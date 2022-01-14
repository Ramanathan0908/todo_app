class AddTagsToTodos < ActiveRecord::Migration[6.1]
  def change
    add_column :todos, :tag, :string
  end
end
