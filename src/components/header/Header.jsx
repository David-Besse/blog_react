import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./header.css";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isActive = localStorage.getItem("blog_user_isActive");
    setIsLoggedIn(isActive);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("blog_access_token");
    localStorage.removeItem("blog_user");
    localStorage.removeItem("blog_user_isActive");
    setIsLoggedIn(false);
  };

  return (
    <header>
      <h1>
        <NavLink to="/" id="loadHome">
          Blog
        </NavLink>
      </h1>
      {isLoggedIn && (
        <>
          <nav>
            <ul>
              <li>
                <NavLink to="/" id="loadHome">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/profile" id="loadProfil">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" id="loadBlog">
                  Blog
                </NavLink>
              </li>
              <li>
                <a href="/" className="disconnect" onClick={handleLogout}>
                  Disconnect
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navigation;
