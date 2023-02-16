import axios from "axios";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/postPreview";
import { PostContext } from "../context/postContext";
import { PostReducer } from "../context/postReducer";

export const Posts = () => {
  const [state, dispatch] = useReducer(PostReducer, useContext(PostContext));
  const [dummy, setDummy] = useState([]);
  console.log(state);
  useEffect(() => {
    setDummy(state);
  }, [state]);

  return (
    <div className="container">
      <Navbar />

      <div className="main">
        <div className="posts">
          {state.map((post) => (
            <div key={post.id} className="post">
              <h3>Titles {post.title}</h3>
              <h4>POST ID : {post.id}</h4>
              <div className="body">
                <p className="content">{post.body}</p>
              </div>
              <button className="preview-btn">Preview</button>
              <button
                className="remove"
                onClick={() =>
                  dispatch({ type: "REMOVE_POST", payload: post.id })
                }
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
