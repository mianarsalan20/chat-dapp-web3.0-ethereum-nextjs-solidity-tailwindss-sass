import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import ChatHome from "./ChatHome";
import Login from "./Login";
import Register from "./Register";
import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

import ConnectWalletButton from "../components/ConnectWalletButton";
import WrongNetworkMessage from "../components/WrongNetworkMessage";
// import { TodoTaskContractAddress } from "../config";
// import TodoTaskAbi from "../backend/build/contracts/TodoTaskContract.json";
// import { ethers } from "ethers";

export default function Home() {
  const {
    correctNetwork,
    networkError,
    isUserLoggedIn,
    currentAccount,
    connectWallet,
  } = useContext(ChatContext);

  return (
    <div>
      {!isUserLoggedIn && !networkError ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : correctNetwork && !networkError ? (
        <Login />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
