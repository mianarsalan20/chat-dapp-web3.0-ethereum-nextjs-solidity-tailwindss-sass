import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";
import Register from "./Register";
import Home from ".";
const Login = () => {
  const [err, setErr] = useState(false);

  const {
    networkError,
    isUserLoggedIn,
    connectWallet,
    setUsername,
    setPassword,
    loginUser,
  } = useContext(ChatContext);

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      {!isUserLoggedIn && !networkError ? (
        <Home />
      ) : (
        <div className="formContainer">
          <div className="formWrapper">
            <span className="logo">DApp Chat</span>
            <span className="title">Login</span>
            <form onSubmit={loginUser}>
              <input
                required
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
              {err && <span>Something went wrong</span>}
            </form>
            <p>
              You don&apos;t have an account?{" "}
              <Link href="/Register">Register</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
