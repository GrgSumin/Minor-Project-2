import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import About from "./components/About";
import { Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Detail from "./components/Detail";
import { Button, Card, Grid, GridItem, Stack } from "@chakra-ui/react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>Welcome to Instrument Mania</h1>
      </div>
      <hr />
      <Header />

      {/* <HomePage /> */}
      <Routes>
        <Route exact path="/about" Component={About} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="home" Component={HomePage} />
        <Route path="/register" Component={Register} />

        <Route path="/Detail/:id" Component={Detail} />
        <Route path="/cart" Component={Cart} />
      </Routes>
      <hr />
      <Footer />
    </>
  );
}

export default App;
