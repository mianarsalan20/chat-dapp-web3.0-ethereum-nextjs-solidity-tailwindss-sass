import React, { useState, useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { ethers } from "ethers";

const Message = ({ message }) => {
  const ref = useRef();
  /* {() => {
                  var utcTime = item.timestamp.toNumber();
                  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                  d.setUTCSeconds(utcTime);
                  ////////////////
                  new Date(item.timestamp.toNumber() * 1000).toUTCString();
                  new Date(item.timestamp.toNumber() * 1000).toLocaleTimeString();

                }} */

  const {
    friendsList,
    addFriUseEffect,
    getMyFriendList,
    currentAccount,
    messagesList,
    showMessages,
  } = useContext(ChatContext);

  useEffect(() => {
    showMessages();
  }, []);

  console.log(messagesList);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="messages">
      {messagesList.map((item) => (
        <>
          <div
            ref={ref}
            key={item.sender}
            className={`message ${
              item.sender.toLowerCase() === currentAccount.toLowerCase() &&
              "owner"
            }`}
          >
            {console.log(item.sender, "sender", currentAccount, "current")}
            <div className="messageInfo">
              <img
                src="https://png.pngitem.com/pimgs/s/130-1300253_female-user-icon-png-download-user-image-color.png"
                alt=""
              />
              <span>
                {new Date(
                  item.timestamp.toNumber() * 1000
                ).toLocaleTimeString()}
              </span>
            </div>
            <div className="messageContent">
              <p>{item.msg}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Message;
