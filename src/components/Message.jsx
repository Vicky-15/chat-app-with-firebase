import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Message = ({ message }) => {
  const currentUser = useContext(AuthContext); //currenr user to fetch
  const { data } = useContext(ChatContext); // //other user to fetch
  console.log(message);
  return (
    <div
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.userInfo.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>

      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};
