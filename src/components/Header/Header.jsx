import React from "react";
import "./Header.css";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


function Header() {
  const categories = ["Health", "Food", "Travel", "Technology"];

  let navigate = useNavigate()

  return (
    <div className="header-container">
      <FaHome className="nav-link" onClick={() => navigate("/")}/>
      <div className="categories-container">
        {categories.map((item, index) => (
          <Link to={`/category/${item}`} key={index} className="nav-link">{item}</Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
