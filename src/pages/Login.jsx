import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
//
export const Login = () => {
  //
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = event.target;
    const email = formData[0].value;
    const password = formData[1].value;

    try {
      // to sign in
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">V Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button>Sign in</button>
        </form>
        {err && <p>Something went wrong</p>}
        <p>You don't have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </div>
  );
};
