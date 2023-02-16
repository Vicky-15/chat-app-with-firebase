import React, { useMemo } from "react";
import "./testStyle.scss";
import { useState, useEffect } from "react";
// whenever the state changes the componet rendered(only) not the page
// the actual concept of component architecture,
export const Test = () => {
  const [number, setNumber] = useState(0);

  console.count("component rendered");

  //   useEffect(() => {
  //     console.log("effect rendered");
  //     const prevInterval = setInterval(() => {
  //       setNumber((prev) => prev + 1);
  //     }, 1000);

  //     // cleanup return
  //     return () => {
  //       clearInterval(prevInterval);
  //     };
  //   }, []);

  return <div className="container">{number}asd</div>;
  //   state chnages component renders only the states, but when the file got any changes, useEffect also runs, without clearing the previous interval so collapsed,
};
