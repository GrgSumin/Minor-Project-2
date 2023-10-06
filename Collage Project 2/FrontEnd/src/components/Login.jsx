import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import e from "cors";
import Register from "./Register";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    
      
    <Box className="B-1">
     
      <h1>
        Login
      </h1>
      
      <form onSubmit={handleSubmit} action="POST">
        <div className="email-box">
        <label className="email">Email address</label>
        
        <Input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        </div>
      <div className="pw">
        <label>Password</label>
        </div>
        <Input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Enter more than 8 characters"
        />
        <button className="button1"
          type="submit">
          login
        </button>
        <br></br>
        <Link to="/register">sign up</Link>
      </form>
    </Box>
    
    
    
    
  );
}

export default Login;
