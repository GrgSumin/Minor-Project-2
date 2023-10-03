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

function HomeDetails({ Mydata }) {
  const { names } = Mydata;
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} margin="100">
      <GridItem w="100%" h="500">
        <Stack direction="row">
          <Image
            boxSize="200px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Image
            boxSize="250px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Image
            boxSize="300px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
        </Stack>
      </GridItem>
      <GridItem w="100%" h="500">
        <GridItem pl="2" area={"header"} margin={2}>
          <Text fontSize="40px">{names}</Text>
        </GridItem>
        <GridItem pl="2" area={"main"}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available
        </GridItem>
        <GridItem pl="2" area={"footer"} margin={3}>
          <Button colorScheme="linkedin">Explore Now</Button>
        </GridItem>
      </GridItem>
    </Grid>
  );
}

export default HomeDetails;
