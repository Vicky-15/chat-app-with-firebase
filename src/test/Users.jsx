import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export const Users = () => {
  const [user, setUser] = useState({});
  const id = useLocation().pathname.split("/")[2];

  // if i leave the page(component the useEffect cleanup() will be done alone, not useEffect initialized)
  //   when new componet rendered we actually releaving this comp so, before the fecth()done we just cleaned the effect
  // ===== using the axios
  useEffect(() => {
    console.log("useeffect mounts");
    //when using strictmode, useEffect usually checked, by running twice, to find any glitches regarding the Needfy of cleanup()
    const cancelToken = axios.CancelToken.source();

    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err))
          console.log("successfully aborted previous request");
      });

    return () => {
      cancelToken.cancel();
      console.log("useeffect UN-mounts");
    };
  }, [id]);

  //   useEffect actually realtime monitor the component scope, if the {id} not changed it won't need to run again(means -> it should cleanup the prev and init the useEffect again), but if the component unmount it just cleanup the useEffect

  return (
    <div className="container">
      <p>User ID : {user.id}</p>
      <p>Name: {user.name}</p>
      <p>UserName: {user.username}</p>
      <p>Email: {user.email}</p>

      <Link to={"/users/1"}>Fetch User 1</Link>
      <Link to={"/users/2"}>Fetch User 2</Link>
      <Link to={"/users/3"}>Fetch User 3</Link>
    </div>
  );
};

// using the fetch
// useEffect(() => {
//     // let cancelled = false;
//     const controller = new AbortController();
//     const abortSignal = controller.signal; // sending the signal as option
//     console.log("inside effect");

//     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
//       signal: abortSignal,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("inside data seted");
//         setUser(data);
//       })
//       .catch((err) => {
//         if (err.name === "AbortError")
//           console.log("successfully aborted previous request");
//         //if something else of err, we do something else
//       });

//     return () => {
//       controller.abort();
//     };
//   }, [id]);
