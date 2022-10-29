import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import Input from "./Input";

const Chat = () => {
  const { selectedUserName } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{selectedUserName}</span>
      </div>
      <Message />
      <Input />
    </div>
  );
};

export default Chat;
