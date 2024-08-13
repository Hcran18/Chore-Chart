import { Cache } from "../cache/cache";
import { Request } from "../model/request";

export class Register {
  cache = null;
  user = null;

  constructor() {
    this.cache = Cache.getInstance();
    this.user = this.cache.getUser();
  }

  async signUp() {
    const url =
      "http://localhost:8000/register/" +
      this.user.getID() +
      "/" +
      this.user.getName();
    const request = new Request();

    try {
      const data = await request.post(url, "Failed to sign up");
      return data;
    } 
    catch (error) {
      throw error;
    }
  }

  async login(username) {
    const url = "http://localhost:8000/login/" + username;
    const request = new Request();

    try {
      const data = await request.post(url, "Failed to log in");
      return data;
    } 
    catch (error) {
      throw error;
    }
  }
}
