import React, { useReducer, useRef, useState } from "react";
import { INITIAL_STATE, postReducer } from "./ReducerLearn";

export const Todo = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);
  // useReducer(reducer(), initialstate) ===>  [state,dispatcher({action,payload,etc....})]
  const [state, dispatcher] = useReducer(postReducer, INITIAL_STATE);

  const fetchHandler = () => {
    // whenever the dispatcher called the depend upon the "action"==> "type:FETCH_SUCCESS" the state is changed.
    dispatcher({ type: "FETCH_START" });
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => {
        dispatcher({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch((e) => {
        dispatcher({ type: "FETCH_ERROR" });
      });
  };

  return (
    <div className="container">
      <button onClick={fetchHandler}>
        {state.loading ? "Wait" : "Fetch the Title"}
      </button>
      <p>{state.post?.title}</p>
      <span className="errMsg">{state.error && "something went wrong"}</span>
    </div>
  );
};
