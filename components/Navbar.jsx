import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Navbar = () => {
  const { networkError, isUserLoggedIn, logoutUser } = useContext(ChatContext);
  return (
    <div className="navbar">
      <span className="logo">DApp Chat</span>
      <div className="user">
        <button onClick={logoutUser}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
