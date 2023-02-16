import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

export const Chats = () => {
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      //onSnapshot os like setCounter()=> it return remove counter, we have to cleanup() it , otherwise overlapped with previous invoke.
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats(); // on first render we dont have currentuserID, so after authcontext get uid, then we do this conditional execution.
  }, [currentUser.uid]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat) => (
        // chat [key, {date: nt, userInfo: {…}}]
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />

          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
