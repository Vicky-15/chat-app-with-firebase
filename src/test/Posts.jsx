import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  console.log("components runs");
  
  useEffect(() => {
    let isCancelled = false;
    console.log("effect runs");
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled) {
          setPosts(data);
          console.log(data);
        }
      });
    return () => {
      console.log("calcelled");
      isCancelled = true;
    };
  }, []);

  return (
    <div className="container">
      {posts?.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};
