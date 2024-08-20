import { useState } from "react";
import { Link } from "react-router-dom";

import { Cache } from "../cache/cache.js";
import { User } from "../model/user.js";
import { Register } from "../presenter/register.js";

import "../App.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassoword] = useState("");
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

    async function handleLogin(e) {
        e.preventDefault();

        const cache = Cache.getInstance();
        const service = new Register();

        try {
            const { message, user } = await service.login(username);
            const givenUser = new User(user[0], user[1], user[2]);
            cache.setUser(givenUser);

            setMessage(message);

            if (message === "User logged in successfully") {
                localStorage.setItem("cache", JSON.stringify(cache));
                window.location.href = "/home";
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="wrapper">
                <h1>Todo Game</h1>
                <h3>Sign up or Login</h3>
                <form>
                    <div className="inputs">
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                className="inputBox"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <lable>
                            Password:
                            <input
                                type="text"
                                name="password"
                                className="inputBox"
                                value={password}
                                onChange={(e) => setPassoword(e.target.value)}
                            />
                        </lable>
                    </div>
                    <div className="buttons">
                        <button type="submit" onClick={handleSignUp}>
                            Sign up
                        </button>
                        <button type="submit" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </form>
                {message === "User registered successfully" && (
                    <Link to="/home"></Link>
                )}
                {message === "User logged in successfully" && (
                    <Link to="/home"></Link>
                )}
            </div>
        </>
    );
}

export default Login;
