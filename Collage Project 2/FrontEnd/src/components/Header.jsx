import { Box } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  return (
    <Box backgroundColor={"pink"} color={"white"} padding={3} gap={5} style={{display:"flex", justifyContent:"center"}}>
      <NavLink>
        
      </NavLink>
      <Navbar />
    </Box>
  );
}

export default Header;
