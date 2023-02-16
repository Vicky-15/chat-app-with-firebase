import React from "react";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <div className="container">
      <Navbar />

      <div className="main">
        <div className="home">
          <h2>We Are Happy to Welcome You</h2>
        </div>
      </div>
    </div>
  );
};
