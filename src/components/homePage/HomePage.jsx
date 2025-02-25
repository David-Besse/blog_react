import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import "./home.css";

const HomePage = () => {
  const [activate, setActivate] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const isConnected = localStorage.getItem("blog_user_isActive");
    const user = JSON.parse(localStorage.getItem("blog_user"));
    console.log(user);

    setActivate(isConnected);
    if (user) {
      setUserName(user.username);
    }
  }, []);

  return (
    <>
      <h2> Bienvenue sur notre blog {userName ? `#${userName}` : ""} !</h2>
      <div className="homePage_button_container">
        <NavLink
          to="/login"
          className="loginLink"
          href="/login"
          style={{ display: activate ? "none" : "block" }}
        >
          Se connecter
        </NavLink>
        <NavLink
          to="/register"
          className="registerLink"
          href="/register"
          style={{ display: activate ? "none" : "block" }}
        >
          S&apos;inscrire
        </NavLink>
      </div>
    </>
  );
};

export default HomePage;
