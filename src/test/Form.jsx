import React, { useReducer, useRef, useState } from "react";
import { formReducer, FORM_INITIAL_STATE } from "./formReducer";

export const Form = () => {
  const [state, dispatcher] = useReducer(formReducer, FORM_INITIAL_STATE);

  const tagRef = useRef();

  const handleTags = () => {
    const tags = tagRef.current.value.split(","); // atlease [""] returned when empty

    tags.forEach((tag) => {
      dispatcher({ type: "ADD_TAG", payload: tag });
    });
  };

  const handleChange = (e) => {
    dispatcher({
      type: "CHANGE_INPUT",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };
  console.log(state);

  return (
    <div>
      <form className="container">
        <input
          onChange={handleChange}
          name="title"
          type="text"
          placeholder="Title"
        />
        <input
          onChange={handleChange}
          name="desc"
          type="text"
          placeholder="Description"
        />
        <input
          onChange={handleChange}
          name="price"
          type="number"
          placeholder="Price"
        />
        <p>Categorys:</p>
        <select onChange={handleChange} name="category">
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-Shirts</option>
          <option value="jeans">Jeans</option>
        </select>
        <p>Tags:</p>
        {/* tagRef is reference to an obj with current prop = undefined
        by default this element is ref to ReactDOM, if we set ref, the ref will set the current DOM node to ref.current */}
        <textarea
          ref={tagRef}
          placeholder="Seperate Tags with Commas..."
        ></textarea>
        <button onClick={handleTags} type="button">
          Add Tags
        </button>

        <div className="tags">
          {state.tags.map((tag, index) => (
            <small
              onClick={() => dispatcher({ type: "REMOVE_TAG", payload: tag })}
              key={index}
            >
              {tag}
            </small>
          ))}
        </div>

        <div className="quantity">
          <button
            onClick={() => dispatcher({ type: "DECREASE_QUANTITY" })}
            type="button"
          >
            -
          </button>
          <span>Qunatity {state.quantity}</span>
          <button
            onClick={() => dispatcher({ type: "INCREASE_QUANTITY" })}
            type="button"
          >
            +
          </button>
        </div>
      </form>
    </div>
  );
};
