import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singup from './component/page/Singup';
import Login from "./component/page/Login";
import Home from "./component/page/Home";
import Profile from "./component/page/Profile";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Singup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
  );
}

export default App;
