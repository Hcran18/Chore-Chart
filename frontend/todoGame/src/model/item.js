export class Item {
    constructor(id, user_id, item, cost) {
        this.id = id;
        this.user_id = user_id;
        this.item = item;
        this.cost = cost;
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

    getItem() {
        return this.item;
    }

    setItem(item) {
        this.item = item;
    }

    getCost() {
        return this.cost;
    }

    setCost(cost) {
        this.cost = cost;
    }
}