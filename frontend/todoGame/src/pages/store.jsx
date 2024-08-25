import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Cache } from "../cache/cache.js";
import { User } from "../model/user.js";
import { Item } from "../model/item.js";

import { itemPresenter } from "../presenter/itemPresenter.js";


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
                const presenter = new itemPresenter();
                const givenItems = await presenter.getItems();

                setItems(givenItems);
            };

            fetchItems();
        }
    }, [user]);

    /**
     * Adds an item to the user's list
     * @param {*} e 
     */
    async function addItem(e) {
        e.preventDefault();

        const presenter = new itemPresenter();
        const id = Math.floor(Math.random() * 1000);
        const userID = user.getID();
        const intCost = parseInt(cost);
        const newItemObj = new Item(id, userID, newItem, intCost);

        const givenItems = await presenter.addItem(newItemObj)

        setItems(givenItems);
        setNewItem("");
        setCost(0);
    }

    /**
     * Purchases an item
     * @param {*} e 
     */
    const purchaseItem = async (e) => {
        e.preventDefault();

        const presenter = new itemPresenter();
        const itemID = e.target.id;

        const {givenItems, updatedUser} = await presenter.purchaseItem(itemID);
        
        if(givenItems != null) {
            setItems(givenItems);
            setNewUser(updatedUser);
            const cache = Cache.getInstance();
            cache.setUser(updatedUser);
            localStorage.setItem("cache", JSON.stringify(cache));
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