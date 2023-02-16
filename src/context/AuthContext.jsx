import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState({});

  useEffect(() => {
    console.log("effect mouted");
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentuser(user);
      console.log(user); //it is like setCounter(), once started it will run continually, before useeffect again called, even though it reset via cleanup()
    }); //onAuthStateChanged() realtime watching after useEffect once runned, so we have to prevent memory leakage by using cleanup,  it returns an unSub() which stops currently running onAuthStateChanged()

    return () => {
      console.log("effect unmouted");
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
