import { useState } from "react";
import { Link } from "react-router-dom";

import { Cache } from "../cache/cache.js";
import { User } from "../model/user.js";
import { Register } from "../presenter/register.js";

import "../App.css";

function Login() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    async function handleSignUp(e) {
        e.preventDefault();

        const cache = Cache.getInstance();
        const id = Math.floor(Math.random() * 1000);
        const newUser = new User(id, username, 0);

        cache.setUser(newUser);

        const service = new Register();

        try {
            const { message, user } = await service.signUp();
            const givenUser = new User(user.id, user.name, user.points);
            cache.setUser(givenUser);

            setMessage(message);

            if (message === "User registered successfully") {
                localStorage.setItem("cache", JSON.stringify(cache));
                window.location.href = "/home";
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div>
                <h1>Todo Game</h1>
                <h3>Sign up</h3>
                <form>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <button type="submit" onClick={handleSignUp}>
                        Sign up
                    </button>
                </form>
                {message === "User registered successfully" && (
                    <Link to="/home">Go to Home</Link>
                )}
            </div>
        </>
    );
}

export default Login;
