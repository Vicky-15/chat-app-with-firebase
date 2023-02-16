import React from "react";

export const PostReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_POST":
      return state.filter((post) => post.id !== action.payload);
  }
};
