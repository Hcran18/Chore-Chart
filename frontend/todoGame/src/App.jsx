import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Store from "./pages/store.jsx";
import { Cache } from './cache/cache.js';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/store" element={<Store />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
