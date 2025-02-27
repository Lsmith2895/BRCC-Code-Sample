import { v4 as uuidv4 } from 'uuid'
import db from '../../models'

const todo = {
  async createTodo(parent, args, context, info) {
    
    try {
      const newTodo = await db.Todo.create({
        id: uuidv4(),
        title: args.data.title,
        completed: args.data.completed || false,
      });
  
      return newTodo;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw new Error("Failed to create todo");
    }


  },

  // TODO: Implement the deleteTodo mutation
  async deleteTodo() {
    return '';
  },

  // TODO: Implement the updateTodo mutation
  async updateTodo() {
    return '';
  },
};

export default todo;