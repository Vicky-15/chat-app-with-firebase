import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { Message } from "./Message";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatID]);

  return (
    <div className="messages">
      {messages.map((m) => 

        <Message key={m.id} message={m} />
      )}
    </div>
  );
};
