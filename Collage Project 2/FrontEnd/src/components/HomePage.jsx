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
} from "@chakra-ui/react";
import React from "react";
import {} from "react-router-dom";
import "../App.css";
import Brands from "./Brands";
import HomeDetails from "./HomeDetails";
import Popular from "./Popular";
import ProductCart from "./ProductCart";

function HomePage() {
  const data = {
    names: "InstrumentMania",
  };
  return (
    <>
      <HomeDetails Mydata={data} />
      <Brands />
      <hr />
      <Popular />

      <ProductCart />
    </>
  );
}

export default HomePage;
