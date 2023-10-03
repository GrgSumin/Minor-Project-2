import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeDetails from "./HomeDetails";

function About() {
  const data = {
    names: "About us",
  };
  return (
    <div>
      <HomeDetails Mydata={data} />
    </div>
  );
}

export default About;
