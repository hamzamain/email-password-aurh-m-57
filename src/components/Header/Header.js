import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header container bg-info p-3 mb-5 text-end rounded shadow">
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default Header;
