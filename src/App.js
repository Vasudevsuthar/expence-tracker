import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singup from './component/page/Singup';
import Login from "./component/page/Login";
import Home from "./component/page/Home";
import Profile from "./component/page/Profile";
import ForgotPass from "./component/page/ForgotPass";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Singup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgotpass" element={<ForgotPass />} />
    </Routes>
  </Router>
  );
}

export default App;
