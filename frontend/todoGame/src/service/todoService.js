import { Cache } from "../cache/cache";
import { Request } from "../model/request";

export class TodoService {
  cache = null;
  user = null;

  constructor() {
    this.cache = Cache.getInstance();
    this.user = this.cache.getUser();
  }

  /**
   * Get all todos
   * @returns {Promise<{todos: []}>}
   */
  async getTodos() {
    const url = "http://localhost:8000/get-todos/" + this.user.getID();
    const request = new Request();

    try {
      const data = await request.get(url, "Failed to get todos");
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add a todo to the user's list
   * @param {Todo} todo 
   * @returns {Promise<{todos: []}>}
   */
  async addTodo(todo) {
    const url =
      "http://localhost:8000/create-todo/" +
      todo.getID() +
      "/" +
      this.user.getID() +
      "/" +
      todo.getTodo() +
      "/" +
      todo.getPoints();
    const request = new Request();

    try {
      const data = await request.post(url, "Failed to add todo");
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Complete a todo
   * @param {number} todoID 
   * @returns {Promise<{message: string, user: {id: number, name: string, points: number}}>}
   */
  async completeTodo(todoID) {
    const url = "http://localhost:8000/complete-todo/" + todoID;
    const request = new Request();

    try {
      const data = await request.delete(url, "Failed to complete todo");
      return data;
    } catch (error) {
      throw error;
    }
  }

}
