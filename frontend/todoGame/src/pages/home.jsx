import { Cache } from "../cache/cache.js";
import { User } from "../model/user.js";
import { Todos } from "../presenter/todos.js";
import { Todo } from "../model/todo.js";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import "../App.css";

function Home() {
    const [user, setNewUser] = useState(null);
    const [newTodo, setNewTodo] = useState("");
    const [points, setPoints] = useState(0);
    const [todos, setTodos] = useState([]);

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
            const fetchTodos = async () => {
                const service = new Todos();
                try {
                    const updatedTodos = await service.getTodos();
                    const givenTodos = updatedTodos.todos.map(
                        (todo) => new Todo(todo[0], todo[1], todo[2], todo[3])
                    );

                    setTodos(givenTodos);
                } catch (error) {
                    console.error("Error fetching todos:", error);
                }
            };

            fetchTodos();
        }
    }, [user]);

    async function addTodo(e) {
        e.preventDefault();

        const service = new Todos();
        const id = Math.floor(Math.random() * 1000);
        const userID = user.getID();
        const intPoints = parseInt(points);
        const newTodoObj = new Todo(id, userID, newTodo, intPoints);

        try {
            const response = await service.addTodo(newTodoObj);

            const updatedTodos = await service.getTodos();
            const givenTodos = updatedTodos.todos.map(
                (todo) => new Todo(todo[0], todo[1], todo[2], todo[3])
            );

            setTodos(givenTodos);

            setNewTodo("");
            setPoints(0);
        } catch (error) {
            console.error(error);
        }
    }

    async function completeTodo(e) {
        e.preventDefault();

        const service = new Todos();
        const id = e.target.id;

        try {
            const {message, user} = await service.completeTodo(id);
            const updatedTodos = await service.getTodos();
            const givenTodos = updatedTodos.todos.map(
                (todo) => new Todo(todo[0], todo[1], todo[2], todo[3])
            );
            setTodos(givenTodos);

            const updatedUser = new User(user.id, user.name, user.points);

            setNewUser(updatedUser);

            const cache = Cache.getInstance();
            cache.setUser(updatedUser);

            localStorage.setItem("cache", JSON.stringify(cache));
        } catch (error) {
            console.error(error);
        }
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome {user.getName()}!</h1>
            <h2>Available Points: {user.getPoints()}</h2>
            <div className="page-links">
                <Link className="link" to="/" onClick={() => localStorage.clear()}>Logout</Link>
                <Link className="link" to="/store">Go to Store</Link>
            </div>
            <form>
                <div className="inputs">
                    <label>
                        Todo:
                        <input
                            type="text"
                            name="newTodo"
                            className="inputBox"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                    </label>
                    <label>
                        Points:
                        <input
                            type="number"
                            name="points"
                            className="inputBox"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" onClick={addTodo}>
                    Submit
                </button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li className="todo" key={todo.getID()}>
                        {todo.getTodo()} | Points: {todo.getPoints()}
                        <button id={todo.getID()} onClick={completeTodo}>
                            Complete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
