export class Todo {
    constructor(id, user_id, todo, points) {
        this.id = id;
        this.user_id = user_id;
        this.todo = todo;
        this.points = points;
    }

    getID() {
        return this.id;
    }

    setID(id) {
        this.id = id;
    }

    getUserID() {
        return this.user_id;
    }

    setUserID(user_id) {
        this.user_id = user_id;
    }

    getTodo() {
        return this.todo;
    }

    setTodo(todo) {
        this.todo = todo;
    }

    getPoints() {
        return this.points;
    }

    setPoints(points) {
        this.points = points;
    }
}