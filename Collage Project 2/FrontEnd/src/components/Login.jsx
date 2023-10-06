import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useState } from "react";
import e from "cors";
import Register from "./Register";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regMessage, setRegMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const changeRegMessage = (msg) => {
      if (msg != "Fill all fields") {
        setEmail("");
        setPassword("");
      }

      setRegMessage(msg);

      setTimeout(() => {
        setRegMessage("");
      }, 3000);
    };

    e.preventDefault();

    if (email == "" && password == "") {
      changeRegMessage(toast("please fill the box"));
      return;
    }
    const requestBody = {
      Email: email,
      Password: password,
    };

    axios
      .post("http://localhost:4000/api/accounts/login", requestBody)
      .then((response) => {
        changeRegMessage(response.data.message);
        toast("Login in sucessfully");
        navigate("/store");
        localStorage.setItem("id", response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className="B-1">
      <div className="form">
        <div className="form1">
          <h1>Login</h1>

          <form onSubmit={handleSubmit} action="POST">
            <div className="boxs">
              <label className="email">Email address</label>

              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>
            <div className="boxs-1">
              <label>Password</label>
              <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Enter more than 8 characters"
              />
            </div>
            <div>{regMessage}</div>
            <button className="button1" type="submit">
              login
            </button>
            <br></br>
            <Link to="/register">sign up</Link>
          </form>
        </div>
      </div>
    </Box>
  );
}

export default Login;
