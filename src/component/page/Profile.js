import React, { useState, useEffect } from "react";
import  "./Profile.css";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const updateHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("token"),
              displayName: name,
              photoUrl: profilePhoto,
              returnSecureToken: true,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
  
        if (res.ok) {
          setLoading(false);
          const data = await res.json();
          console.log(data);
          navigate('/home');
          console.log("Profile data submitted successfully");
        } else {
          setLoading(false);
          const data = await res.json();
          if (data && data.error.message) {
            setError("Profile not updated successfully- " + data.error.message);
          } else {
            setError("Some error occured!! Please try again..");
          }
        }
      } catch (error) {
        console.error("Error in Profile Updation :", error);
      }
      setName("");
      setProfilePhoto("");
    };


    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",
            {
              method: "POST",
              body: JSON.stringify({
                idToken: token,
              }),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            setName(data.users[0].displayName);
            setProfilePhoto(data.users[0].photoUrl);
            console.log("Data fetch Success");
            //navigate('/home');
            return data;
          } else {
            const data = await res.json();
            if (data && data.error.message) {
              setError("Profile not updated successfully- " + data.error.message);
            } else {
              setError("Some error occured!! Please try again..");
            }
          }
        } catch (error) {
          console.error("Error in Profile Updation :", error);
        }
      };
      fetchData();
    }, []);
  

  return (
    <div className="lcontainer">
      <div className="topText">
        <div className="quote">
          Winners never quit, quitters never win
        </div>
        <div className="profileInfo">
          <i>Your profile is 60% complete. AComplete Profile has a higher chance of
          landing a job. <Link to="">Complete Now</Link> </i>
        </div>
      </div>
      <hr />

      <div className={"profile-form-container"}>
        <h2 className="title">Contact Details</h2>
        <div className="Inputs">
          <div className="input-container">
            <label htmlFor="fullName" className="label">
              <BsGithub /> Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="Input"
            />
          </div>
          <div className={["input-container"]}>
            <label htmlFor="photoUrl" className={"label"}>
              <BsGlobe /> Profile Photo URL:
            </label>
            <input
              type="text"
              id="photoUrl"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
              className="Input"
            />
          </div>
        </div>
        <hr />
        <p className="errorMessage">{error}</p>
        {!loading && (
          <button className={["update-button"]} onClick={updateHandler}>
            Update
          </button>
        )}
        <button className={["cancel-button"]}>Cancel</button>
        {loading && <h2>Submitting Data...</h2>}
      </div>
    </div>
  );
};

export default Profile;