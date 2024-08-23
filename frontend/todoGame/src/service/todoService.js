import { Cache } from "../cache/cache";
import { Request } from "../model/request";

export class TodoService {
  cache = null;
  user = null;

  constructor() {
    this.cache = Cache.getInstance();
    this.user = this.cache.getUser();
  }

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
