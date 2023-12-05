import React, { useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Spinner from "../UI/Spinner";
import "./Main.css";

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    setTimeout(async()=>{
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        authCtx.login(data.idToken, enteredEmail);
        alert("Login successful");
        navigate("/home");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
    } catch (error) {
      alert(error.message);
    }

    setIsLoading(false);
  },3000);
  };

  return (
    <div className="lContainer">
      <div className="1Item">
        <div className="loginForm">
          <h1 className="h1">Login</h1>
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

            {!isLoading && (
              <Button type="submit" className="login-form-button">
                Login
              </Button>
            )}
            {isLoading && <Spinner></Spinner>}

            <br />
            <br />

            <p>
              Don't have an account? <Link to="/">Sign up</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
