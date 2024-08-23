import { User } from "../model/user.js";
import { RegisterService } from "../service/registerService.js";

export class RegisterPresenter {
    service = null;

    constructor() {
        this.service = new RegisterService();
    }

    async register() {
        try {
            const { message, user } = await this.service.signUp();
            const givenUser = new User(user.id, user.name, user.points);

            return {message, givenUser}
        } catch (error) {
            console.error(error);
        }
    }

    async login(username) {
        try {
            const { message, user } = await this.service.login(username);
            const givenUser = new User(user[0], user[1], user[2]);

            return {message, givenUser}
        } catch (error) {
            console.error(error);
        }
    }
}