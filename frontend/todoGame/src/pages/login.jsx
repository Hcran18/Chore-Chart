import { useState } from "react";
import { Link } from "react-router-dom";

import { Cache } from "../cache/cache.js";
import { User } from "../model/user.js";
import { RegisterPresenter } from "../presenter/registerPresenter.js";

import "../App.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassoword] = useState("");
    const [message, setMessage] = useState("");

    /**
     * handles a user registering
     * @param {*} e 
     */
    async function handleSignUp(e) {
        e.preventDefault();

        const presenter = new RegisterPresenter();
        const cache = Cache.getInstance();
        const id = Math.floor(Math.random() * 1000);
        const newUser = new User(id, username, 0);
        cache.setUser(newUser);

        const {message, givenUser} = await presenter.register();
        setMessage(message);
        cache.setUser(givenUser);

        if (message === "User registered successfully") {
            localStorage.setItem("cache", JSON.stringify(cache));
            window.location.href = "/home";
        }
    }

    /**
     * handles a user logging in
     * @param {*} e 
     */
    async function handleLogin(e) {
        e.preventDefault();
        
        const cache = Cache.getInstance();
        const presenter = new RegisterPresenter();
        const {message, givenUser} = await presenter.login(username);
        cache.setUser(givenUser);
        setMessage(message);

        if (message === "User logged in successfully") {
            localStorage.setItem("cache", JSON.stringify(cache));
            window.location.href = "/home";
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
                        <label>
                            Password:
                            <input
                                type="text"
                                name="password"
                                className="inputBox"
                                value={password}
                                onChange={(e) => setPassoword(e.target.value)}
                            />
                        </label>
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
