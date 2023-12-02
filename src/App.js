import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singup from './component/Singup';
import Login from "./component/Login";
import WelcomePage from "./component/page/WelcomePage";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Singup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/welcomepage" element={<WelcomePage/>} />
    </Routes>
  </Router>
  );
}

export default App;
