import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";
import classes from './Home.module.css';

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.lContainer}>
      <h3>Welcome to Expense Tracker</h3>
      {authCtx.isLoggedIn && (
        <i>
          Your Profile is Incomplete <Link to="/profile">Complete Now</Link>
        </i>
      )}
    </div>
  );
};

export default Home;
