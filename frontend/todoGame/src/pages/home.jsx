import { Cache } from "../cache/cache.js";
import { User } from "../model/user.js";
import { Todos } from "../presenter/todos.js";
import { Todo } from "../model/todo.js";

import { useEffect, useState } from "react";

import "../App.css";

function Home() {
  const [user, setNewUser] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [points, setPoints] = useState(0);
  const [todos, setTodos] = useState([]);
  let cache = null;

  useEffect(() => {
    cache = Cache.getInstance();
    const storedUser = JSON.parse(localStorage.getItem("cache"));

    if (storedUser) {
      const newUser = new User(
        storedUser.user.id,
        storedUser.user.name,
        storedUser.user.points
      );

      cache.setUser(newUser);
      setNewUser(newUser);
      console.log("Retrieved User:", user);
    }
  }, []);

  async function addTodo(e) {
    e.preventDefault();

    const service = new Todos();
    const id = Math.floor(Math.random() * 1000);
    const userID = user.getID();
    const intPoints = parseInt(points);
    const newTodoObj = new Todo(id, userID, newTodo, intPoints);

    try {
      const response = await service.addTodo(newTodoObj);
      console.log("Response:", response);
    } catch (error) {
      console.error(error);
    }
  }

    async function getTodos(e) {
        e.preventDefault();

        const service = new Todos();

        try {
            const response = await service.getTodos();
            const givenTodos = response.todos.map(todo => new Todo(
              todo[0], 
              todo[1], 
              todo[2], 
              todo[3]
            ));

            setTodos(givenTodos);
          } catch (error) {
            console.error(error);
          }
    }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome: {user.getName()}</h1>
      <h2>Available Points: {user.getPoints()}</h2>
      <form>
        <label>
          Add Todo:
          <input
            type="text"
            name="newTodo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </label>
        <label>
          Points:
          <input
            type="number"
            name="points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </label>
        <button type="submit" onClick={addTodo}>
          Submit
        </button>
      </form>
      <button onClick={getTodos}>View Todos</button>
        
      <ul>
        {todos.map(todo => (
          <li key={todo.getID()}>
            {todo.getTodo()} | Points: {todo.getPoints()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
