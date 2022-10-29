import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { ChatContext } from "../context/ChatContext";

function ChatHome() {
  const { connectWallet } = useContext(ChatContext);

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default ChatHome;
