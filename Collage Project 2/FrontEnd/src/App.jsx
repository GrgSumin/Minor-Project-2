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
// import Detail from "./components/Detail";
import { Button, Card, Grid, GridItem, Stack } from "@chakra-ui/react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OurSTore from "./Stores/OurSTore";
import ProductDetail from "./Stores/ProductDetail";
import Payment from "./Stores/Payment";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");
  return (
    <>
      <div
        style={{
          backgroundColor: "grey",
          color: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="logo"
          style={{ width: "10%", height: "10%", backgroundColor: "gray" }}
        >
          <img src="logo1.png" />
        </div>
      </div>
      <hr />
      <Header />

      {/* <HomePage /> */}
      <Routes>
        <Route exact path="/about" Component={About} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="home" Component={HomePage} />
        <Route path="/register" Component={Register} />
        <Route path="/store" Component={OurSTore} />
        {/* <Route path="/Detail/:id" Component={Detail} /> */}
        <Route path="/cart" Component={Cart} />
        <Route path="/detail" Component={ProductDetail} />
        <Route path="/payment" Component={Payment} />
      </Routes>
      <hr />
      <Footer />
    </>
  );
}

export default App;
