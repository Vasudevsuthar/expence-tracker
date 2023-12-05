import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "../UI/Spinner";
import "./Main.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setLoading(false);
          if (response.ok) {
            response.json().then((data) => {
              console.log(data);
              alert("Password reset request sent");
              Navigate("/Login")
            });
          } else {
            response.json().then((data) => {
              if (data && data.error.message) {
                setError("SignUp not successful- " + data.error.message);
              } else {
                setError("Some error occured!! Please try again..");
              }
            });
          }
        })
        .catch((err) => {
          console.log("Reset Password request not sent - " + err.message);
        });
      setEmail("");
    }, 2000);
  };

  return (
    <div className={"lContainer"}>
      <div className="1Item">
        <div className="loginForm">
          <h1 className="h1">Forget Password</h1>
          <Form className="login-form">
            <h3
              className="h3"
              style={{ textAlign: "center", marginTop: "15px" }}
            >
              Enter Your Registered Email
            </h3>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                className="input"
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {!loading && (
              <Button
                type="submit"
                onClick={passwordChangeHandler}
                className="login-form-button"
              >
                Send Link
              </Button>
            )}
            {loading && <Spinner></Spinner>}
            {loading && (
              <p style={{ textAlign: "center" }}>Submitting Data...</p>
            )}
            <br />
            <br />
            <p>
              Already a user? <Link to="/Login">Login here</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
