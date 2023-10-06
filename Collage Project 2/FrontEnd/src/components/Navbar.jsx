import React from "react";
import { Link, NavLink } from "react-router-dom";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { CgClose, CgMenu } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import "../App.css";
import { AiFillApple } from "react-icons/ai";

function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ boxShadow: "6px 5px lightgray", fontFamily: "cursive" }}
      >
        <a className="navbar-brand" href="#">
          <img
            src="https://icons.veryicon.com/png/o/object/material_design_icons/guitar-23.png"
            width="40"
            height="24"
          />
        </a>

        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            InstrumentMania
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link active"
                  aria-current="page"
                >
                  {localStorage.getItem("id") ? "Logout" : "Login"}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/registers"
                  className="nav-link active"
                  aria-current="page"
                >
                  MyOrders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  About
                </Link>
              </li>
              {localStorage.getItem("id") && (
                <li className="nav-item">
                  <Link
                    to="/store"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Our Products
                  </Link>
                </li>
              )}
              <li>
                <NavLink to="/cart">
                  <TfiShoppingCartFull
                    style={{
                      height: 24,
                      width: 30,
                      color: "black",
                      margin: "8px",
                    }}
                  />
                </NavLink>
              </li>
            </ul>

            <div
              style={{
                display: "none",
                backgroundColor: "transparent",
                curser: "pointer",
                border: "none",
              }}
            >
              <CgMenu
                style={{
                  height: 34,
                  width: 40,
                }}
              />
              <CgClose
                style={{
                  display: "none",
                  height: 34,
                  width: 40,
                  top: "40%",
                  left: "54%",
                }}
              />
            </div>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <NavLink>
                <AiFillApple />
              </NavLink>

              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
