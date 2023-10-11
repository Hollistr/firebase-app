import React from "react";
import "./Header.css";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Header() {
  // get the user data
  const [user] = useAuthState(auth);
  // console.log("user", user)

  const categories = ["Health", "Food", "Travel", "Technology"];

  let navigate = useNavigate();

  return (
    <div className="header-container">
      <FaHome className="nav-link" onClick={() => navigate("/")} />
      {user && (
        <Link to="/addArticle" className="auth-link">
          Add Article
        </Link>
      )}
      <div className="categories-container">
        {categories.map((item, index) => (
          <Link to={`/category/${item}`} key={index} className="nav-link">
            {item}
          </Link>
        ))}
      </div>
      {user ? (
        <div>
          <span className="username">
            {user.displayName ? user.displayName : user.email}
          </span>
          <button className="auth-link" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      ) : (
        <Link className="auth-link" to={"/auth"}>
          Signup
        </Link>
      )}
    </div>
  );
}

export default Header;
