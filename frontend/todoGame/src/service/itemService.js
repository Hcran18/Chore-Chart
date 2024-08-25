import { Cache } from "../cache/cache";
import { Request } from "../model/request";

export class ItemService {
    cache = null;
    user = null;

    constructor() {
        this.cache = Cache.getInstance();
        this.user = this.cache.getUser();
    }

    /**
     * Get all items
     * @returns {Promise<{items: []}>}
     */
    async getItems() {
        const url = "http://localhost:8000/get-items/" + this.user.getID();
        const request = new Request();

        try {
            const data = await request.get(url, "Failed to get items");
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add an item to the user's list
     * @param {Item} item 
     * @returns {Promise<{items: []}>}
     */
    async addItem(item) {
        const url =
            "http://localhost:8000/create-item/" +
            item.getID() +
            "/" +
            this.user.getID() +
            "/" +
            item.getItem() +
            "/" +
            item.getCost();
        const request = new Request();

        try {
            const data = await request.post(url, "Failed to add item");
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Purchase an item
     * @param {number} itemID 
     * @returns {Promise<{items: [], user: User}>}
     */
    async purchaseItem(itemID) {
        const url = "http://localhost:8000/purchase-item/" + this.user.getID() + "/" + itemID;
        const request = new Request();

        try {
            const data = await request.delete(url, "Failed to delete item");
            return data;
        } catch (error) {
            throw error;
        }
    }
}