import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [regMessage, setRegMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const changeRegMessage = (msg) => {
      if (msg != "Fill all fields") {
        setEmail("");
        setUsername("");
        setPassword("");
        setNumber("");
      }

      setRegMessage(msg);

      setTimeout(() => {
        setRegMessage("");
      }, 3000);
    };

    e.preventDefault(); // Cancel the form submission

    if (username == "" || email == "" || password == "" || number == "") {
      changeRegMessage(toast("please fill the box"));
      return;
    }

    const requestBody = {
      Username: username,
      Email: email,
      Password: password,
      Phonenumber: number,
    };

    axios
      .post("http://localhost:4000/api/accounts/register", requestBody)
      .then((response) => {
        changeRegMessage(toast("Account Created"));
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="B-1">
        <div>
          <h1
            style={{
              fontSize: 30,
              margin: 20,
            }}
          >
            Registeration
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
            <div>{regMessage}</div>
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
        </div>
      </div>
    </>
  );
}

export default Register;
