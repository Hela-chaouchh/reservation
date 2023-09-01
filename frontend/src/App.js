import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";
import Dashboard from "./components/Home";
import User from "./components/Profile";

function App() {

  return (
    <div className="App">
      <div className="Basic-container">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path='/profile' element={<User />} />
          </Routes>

        </Router>
      </div>
    </div>
  );
}

export default App;
