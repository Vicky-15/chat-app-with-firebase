import Add from "../img/addAvatar.png";
import {
  createUserWithEmailAndPassword as createUser,
  updateProfile,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

//
export const Register = () => {
  //
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = event.target;
    const displayName = formData[0].value;
    const email = formData[1].value;
    const password = formData[2].value;
    const avatarFile = formData[3].files[0];

    try {
      const res = await createUser(auth, email, password); //register and return currently signed in user

      // to upload, profileName&photo in storage
      const storageRef = ref(storage, displayName); // returns ref obj
      const uploadTask = uploadBytesResumable(storageRef, avatarFile); // returns uploadReady obj, to upload via on()

      
      uploadTask.on(
        null,
        null,
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            }); // updateProfile(who?,{properties}) from auth-db

            // doc()--> /*returns an "user" doc from "users" collection*/
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              email: email,
              displayName: displayName,
              photoURL: downloadURL,
            });
            // "userChats" collection
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          }); //getDownload( take ref obj and return URL as string as promise)
        }
      ); //return void, on(?,?,err(),success())





    } catch (e) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">V Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        {err && <p>Something went wrong</p>}
        <p>
          You do have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};
