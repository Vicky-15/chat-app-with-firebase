import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link id="page-links" to={"/"}>
        Home
      </Link>
      <Link id="page-links" to={"/about"}>
        About
      </Link>
      <Link id="page-links" to={"/posts"}>
        Posts
      </Link>
      <Link id="page-links" to={"/contact"}>
        Contact
      </Link>
    </div>
  );
};
