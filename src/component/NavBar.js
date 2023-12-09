import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import AuthContext from "./store/auth-context";
import { useNavigate } from "react-router";

const NavBar = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("allExpense");
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand style={{marginLeft:"10px"}}>Expense Tracker</Navbar.Brand>
        <Nav className="me-auto">
          {authCtx.isLoggedIn && <Nav.Link href="/home">Home</Nav.Link>}
          {authCtx.isLoggedIn && <Nav.Link href="/profile">Profile</Nav.Link>}
          {authCtx.isLoggedIn && <Nav.Link href="/expnses">Expense</Nav.Link>}
        </Nav>
        {authCtx.isLoggedIn && (
          <Button
            style={{ padding: "5px", margin: "10px" }}
            variant="danger"
            onClick={logoutHandler}
          >
            Log-Out
          </Button>
        )}
      </Navbar>
    </div>
  );
};

export default NavBar;
