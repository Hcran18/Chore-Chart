import { ItemService } from "../service/itemService";
import { Item } from "../model/item";
import { User } from "../model/user";

export class itemPresenter {
    service = null;

    constructor() {
        this.service = new ItemService();
    }

    /**
     * Get all items
     * @returns {Promise<Item[]>}
     */
    async getItems() {
        try {
            const updatedItems = await this.service.getItems();
            const givenItems = updatedItems.items.map(
                (item) => new Item(item[0], item[1], item[2], item[3])
            );

            return givenItems
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    /**
     * Add an item to the user's list
     * @param {Item} newItemObj 
     * @returns {Promise<Item[]>}
     */
    async addItem(newItemObj) {
        try {
            const response = await this.service.addItem(newItemObj);
            const updatedItems = await this.service.getItems();
            const givenItems = updatedItems.items.map(
                (item) => new Item(item[0], item[1], item[2], item[3])
            );

            return givenItems;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Purchase an item
     * @param {number} itemID 
     * @returns {Promise<{givenItems: Item[], updatedUser: User}>}
     */
    async purchaseItem(itemID) {
        try {
            const {message, user} = await this.service.purchaseItem(itemID);
            if (message === "Insufficient points to purchase this item") {
                alert("Insufficient points to purchase this item");
                const givenItems = null;
                const updatedUser = user;

                return {givenItems, updatedUser};
            }
            const updatedItems = await this.service.getItems();
            const givenItems = updatedItems.items.map(
                (item) => new Item(item[0], item[1], item[2], item[3])
            );

            const updatedUser = new User(user.id, user.name, user.points);

            return {givenItems, updatedUser}
        } catch (error) {
            console.error(error);
        }
    }
}