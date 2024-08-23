import { Cache } from "../cache/cache";
import { Request } from "../model/request";

export class RegisterService {
  cache = null;
  user = null;

  constructor() {
    this.cache = Cache.getInstance();
    this.user = this.cache.getUser();
  }

  /**
   * registers the user with the information stored in the cache
   * @returns {Promise<Object>} A dictionary holding the user info
   */
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

  /**
   * logs in the user using the given username
   * @param {String} username 
   * @returns {Promise<Array>} List of user info [id, name, points]
   */
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
