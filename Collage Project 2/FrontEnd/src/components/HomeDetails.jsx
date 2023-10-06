import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import {GiGuitar } from "react-icons/gi";


function HomeDetails({ Mydata }) {
  const { names } = Mydata;
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} margin="100">
      <GridItem w="100%" h="500">
        <Stack direction="row">
          <Image
            boxSize="500px"
            objectFit="cover"
            src="guitarnation.jpg"
            alt="Dan Abramov"
            className="cols"
          />
          
          
        </Stack>
      </GridItem>
      <GridItem w="100%" h="500" style={{border:"solid gray"}}>
        <GridItem pl="2" area={"header"} margin={2}>
          <div style={{display:"flex", justifyContent:"center" }}>
            <GiGuitar style={{fontSize: 50}} />
          <Text fontSize="40px">{names}</Text>
          </div>
        </GridItem>
        <GridItem pl="2" area={"main"}>
        Instrument mania is a one stop place to get the entire range of musical instruments. 
        Connect with us for all the musical information, knowledge, tips and updates.
        </GridItem>
        <GridItem pl="2" area={"footer"} margin={3}>
          
        </GridItem>
      </GridItem>
    </Grid>
  );
}

export default HomeDetails;