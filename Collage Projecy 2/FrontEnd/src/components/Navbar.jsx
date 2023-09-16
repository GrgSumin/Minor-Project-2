import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormLabel,
  Heading,
  Indicator,
  Input,
  Stack,
  Text,
  Image,
  flexbox,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { CgClose, CgMenu } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";

function Navbar() {
  return (
    <div>
      <Box
        backgroundColor={"black"}
        color={"white"}
        display={"flex"}
        justifyContent={"center"}
        gap={5}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            display: "flex",
            margin: 10,
            gap: 35,
            width: 500,
            padding: 5,
          }}
        >
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="">Contact US</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/store">Our Products</Link>
          </li>
          <div>
            <li>
              <NavLink to="/cart">
                <TfiShoppingCartFull
                  style={{
                    height: 34,
                    width: 40,
                  }}
                />
                <span
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                    backgroundColor: "white",
                    color: "#000",
                    borderRadious: "50%",
                    position: "absolute",
                    display: "grid",
                    placeItems: Center,
                  }}
                >
                  10
                </span>
              </NavLink>
            </li>
          </div>
        </ul>
        <Box>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
              aria-label="Search here"
              aria-describedby="basic-addon2"
            />
            <span className="input-group-text" id="basic-addon2">
              <BsSearch />
            </span>
          </div>
        </Box>
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
      </Box>
    </div>
  );
}

export default Navbar;
