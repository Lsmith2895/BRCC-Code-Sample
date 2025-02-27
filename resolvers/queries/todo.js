import db from '../../models'

const todo = {
  async todos() {
    try {
      const todos = await db.Todo.findAll({
        attributes: ['id', 'title', 'completed'],
      });

      return todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }));

    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch todos");
    }
  },
};

export default todo;