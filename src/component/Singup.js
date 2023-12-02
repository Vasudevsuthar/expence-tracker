import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./UI/Spinner";
import "./Main.css";

const Signup = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          navigate("/welcomepage");

          alert("Account created successfully");
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 3000);
  };

  return (
    <div className={"lContainer"}>
      <div className="1Item">
        <div className="loginForm">
          <h1 className="h1">Sign up</h1>
          <Form onSubmit={submitHandler} className="login-form">
            <h3 className="h3">Email</h3>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                className="input"
                ref={emailInputRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <h3 className="h3">Password</h3>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                className="input"
                ref={passwordInputRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <h3 className="h3">Confrim Password</h3>
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Control
                className="input"
                ref={confirmPasswordInputRef}
                type="password"
                placeholder="Confrim Password"
              />
            </Form.Group>

            {!isLoading && (
              <Button type="submit" className="login-form-button">
                Submit
              </Button>
            )}
            {isLoading && <Spinner></Spinner>}
            <br />
            <br />
            <p>
              Have an account? <Link to="/Login">Login here</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
