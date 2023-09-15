import { Box } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  return (
    <Box backgroundColor={"black"} color={"white"} padding={3} gap={5}>
      <NavLink>
        <img src="./Guitar.jpg" width="40" height="24" />
      </NavLink>
      <Navbar />
    </Box>
  );
}

export default Header;
