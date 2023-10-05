import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import e from "cors";
import Register from "./Register";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <Box
      padding={10}
      style={{
        border: "solid",
        margin: 100,
        padding: 30,
      }}
    >
      <h1
        style={{
          fontSize: 30,
          margin: 20,
        }}
      >
        Login
      </h1>
      <form onSubmit={handleSubmit} action="POST">
        <label>enter your Email address</label>
        <Input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />

        <button
          type="submit"
          style={{
            backgroundColor: "Gray",
            border: " solid",
            borderRadius: 5,
            margin: 19,
            padding: 8,
          }}
        >
          submit
        </button>
      </form>
    </Box>
  );
}

export default ForgotPassword;
