import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Singup from './component/page/Singup';
import Login from "./component/page/Login";
import Home from "./component/page/Home";
import Profile from "./component/page/Profile";
import ForgotPass from "./component/page/ForgotPass";
import NavBar from "./component/NavBar";
import Expense from "./component/Expenses/Expense";



function App() {

const Navbar = () => {
  const hiddenRouts = ["/","/Login","forgotpass"];
  return !hiddenRouts.includes(window.location.pathname);
}
  
  return (
    <Router>
      {Navbar() && <NavBar />}
    <Routes>
      <Route path="/" element={<Singup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgotpass" element={<ForgotPass />} />
      <Route path="/expnses" element={<Expense />} />
    </Routes>
  </Router>
  );
}

export default App;
