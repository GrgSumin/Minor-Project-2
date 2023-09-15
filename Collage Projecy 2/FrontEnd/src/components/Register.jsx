import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

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
        <label>Email address</label>
        <Input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <label>UserName</label>
        <Input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
        />
        <label>Password</label>
        <Input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="enter more tha 8 characters"
        />
        <label>Phone number</label>
        <Input
          value={number}
          type="number"
          onChange={(e) => setNumber(e.target.value)}
          name="phone number"
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
          Submit
        </button>
      </form>
    </Box>
  );
}

export default Register;
