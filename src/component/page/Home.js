import React, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);

  const verifyHandler = (e) => {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
          });
        } else {
          res.json().then((data) => {
            if (data && data.error && data.error.message) {
              setError(
                "Verification mail not sent... try again" + data.error.message
              );
            } else {
              setError("Some error occured!! Please try again..");
            }
          });
        }
      })
      .catch((err) => {
        console.log("Some error in sending verification mail - " + err);
      });
  };

  const logoutHandler = () => {
    authCtx.logout();
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("allExpense");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={classes.lContainer}>
      <div className={classes.header}>
        <h3 className={classes.h3}>Welcome to Expense Tracker</h3>
        {authCtx.isLoggedIn && (
          <i className={classes.i}>
            Your Profile is Incomplete <Link to="/profile">Complete Now</Link>
          </i>
        )}
        
      </div>
      <div className={classes.container}>
        {authCtx.isLoggedIn && (
          <div>
            <h2>Verify your email</h2>
            <button className={classes.verifyBtn} onClick={verifyHandler}>
              Verify Email{" "}
            </button>
          </div>
        )}
        <p className={classes.errorMessage}>{error}</p>
      </div>
    </div>
  );
};

export default Home;
