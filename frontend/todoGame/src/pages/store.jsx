import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Cache } from "../cache/cache.js";
import { User } from "../model/user.js";
import { Item } from "../model/item.js";
import { Items } from "../service/items.js";


function Store() {
    const [user, setNewUser] = useState(null);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [cost, setCost] = useState(0);

    useEffect(() => {
        const cache = Cache.getInstance();
        const storedCache = JSON.parse(localStorage.getItem("cache"));

        if (storedCache && storedCache.user) {
            const storedUser = storedCache.user;

            const newUser = new User(
                storedUser.id,
                storedUser.name,
                storedUser.points
            );

            cache.setUser(newUser);
            setNewUser(newUser);
        }
    }, []);

    useEffect(() => {
        if (user) {
            const fetchItems = async () => {
                const service = new Items();
                try {
                    const updatedItems = await service.getItems();
                    const givenItems = updatedItems.items.map(
                        (item) => new Item(item[0], item[1], item[2], item[3])
                    );

                    setItems(givenItems);
                } catch (error) {
                    console.error("Error fetching items:", error);
                }
            };

            fetchItems();
        }
    }, [user]);

    async function addItem(e) {
        e.preventDefault();

        const service = new Items();
        const id = Math.floor(Math.random() * 1000);
        const userID = user.getID();
        const intCost = parseInt(cost);
        const newItemObj = new Item(id, userID, newItem, intCost);

        try {
            const response = await service.addItem(newItemObj);
            const updatedItems = await service.getItems();
            const givenItems = updatedItems.items.map(
                (item) => new Item(item[0], item[1], item[2], item[3])
            );

            setItems(givenItems);

            setNewItem("");
            setCost(0);
        } catch (error) {
            console.error(error);
        }
    }

    const purchaseItem = async (e) => {
        e.preventDefault();

        const service = new Items();
        const itemID = e.target.id;

        try {
            const {message, user} = await service.purchaseItem(itemID);
                if (message === "Insufficient points to purchase this item") {
                    alert("Insufficient points to purchase this item");
                    return;
                }
            const updatedItems = await service.getItems();
            const givenItems = updatedItems.items.map(
                (item) => new Item(item[0], item[1], item[2], item[3])
            );
            setItems(givenItems);

            const updatedUser = new User(user.id, user.name, user.points);

            setNewUser(updatedUser);

            const cache = Cache.getInstance();
            cache.setUser(updatedUser);

            localStorage.setItem("cache", JSON.stringify(cache));
        } catch (error) {
            console.error(error);
        }
    };
    
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Purchase an Item!</h1>
            <h2>Available Points: {user.getPoints()}</h2>
            <div className="page-links">
                <Link className="link" to="/" onClick={() => localStorage.clear()}>Logout</Link>
                <Link className="link" to="/home">Go to Todos</Link>
            </div>
            <form>
                <div className="inputs">
                    <label>
                        Item:
                        <input
                            type="text"
                            name="newItem"
                            className="inputBox"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                        />
                    </label>
                    <label>
                        Cost:
                        <input
                            type="number"
                            name="cost"
                            className="inputBox"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" onClick={addItem}>
                    Submit
                </button>
            </form>
            <ul>
                {items.map((item) => (
                    <li className="item" key={item.getID()}>
                        {item.getItem()} | Points: {item.getCost()}
                        <button id={item.getID()} onClick={purchaseItem}>
                            Complete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Store;