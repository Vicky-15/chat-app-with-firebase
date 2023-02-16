import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Search = () => {
  const [username, setUsername] = useState("");

  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", username));

    try {
      const queryUser = await getDocs(q); //Promise result parsed qith await already
      if (queryUser.size === 0) {
        setErr(true);
      }
      queryUser.forEach((doc) => {
        //queryUser is an Object, but firebsae have "forEach" for it.
        setErr(false);
        setUser(doc.data());
      });
    } catch (e) {
      setErr(true);
    }
  };

  const handleKey = (event) => {
    event.key === "Enter" && handleSearch();
  };

  const handleSelect = async (event) => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedID)); // always remember doc reference is get by doc(),
      // whenver something to do with doc we need it.

      // if the combinedID doc doesn't exist it will return the status is res.exist()
      if (!res.exists()) {
        //if no chat group exists between them we create it now
        await setDoc(doc(db, "chats", combinedID), { messages: [] }); //chats collection also created if not exist, and give emty data as array, so we could get the data
      }
      //adding combinedchat to currentuser chat list, "userChats" by updating it, which is alreday one there,

      //for currentUser chatRegistering
      updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedID + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });

      //for selectedUser chatRegistering
      updateDoc(doc(db, "userChats", user.uid), {
        [combinedID + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });

      dispatch({ type: "CHANGE_USER", payload: user });

      setUser(null);
      setUsername("");
    } catch (error) {
      //
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          value={username}
          type="text"
          placeholder="Find a user"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span className="searchResult">User not Found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />

          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
