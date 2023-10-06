import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ReactStars from "react-rating-stars-component";
// import ReactImageZoom from "react-image-zoom";

function ProductDetail() {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      style={{
        margin: "100px",
        padding: "50px",
        boxShadow: "5px 10px aliceblue",
        gap: 50,
      }}
    >
      <Image
        style={{ boxShadow: "5px 10px aliceblue" }}
        objectFit="cover"
        maxW={{ base: "100%", sm: "250px" }}
        src="Gibson1.jpg"
        alt="Caffe Latte"
        className="cols"
      />

      <Stack>
        <CardBody style={{ margin: "10px" }}>
          <Heading
            style={{
              fontFamily: "cursive",
              fontSize: 30,
            }}
          >
            Lespaul
          </Heading>
          <Text
            style={{
              fontFamily: "cursive",
              fontSize: 20,
            }}
          >
            gibson
          </Text>
          <Text
            style={{
              fontFamily: "cursive",
              fontSize: 20,
            }}
          >
            Rs 700000
          </Text>
          <div style={{ display: "flex", gap: 10 }}>
            <Text
              style={{
                fontFamily: "cursive",
                fontSize: 20,
              }}
            >
              Quantity
            </Text>
            <NumberInput defaultValue={0} min={0} max={10}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <ReactStars count={5} size={24} activeColor="#ffd700" />
          <Text
            style={{
              fontFamily: "cursive",
              fontSize: 20,
            }}
            py="2"
          >
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="solid" colorScheme="teal">
              Buy Now
            </Button>
            <Button variant="solid" colorScheme="yellow">
              Add to cart
            </Button>
          </div>
          <hr />
          <Text
            style={{
              fontFamily: "cursive",
              fontSize: 20,
            }}
          >
            Reviews (2 reviews)
          </Text>
          <Input placeholder="Type your review" size="lg" />
          <div style={{ margin: 10 }}>
            <Button variant="solid" colorScheme="blue">
              Submit
            </Button>
          </div>
        </CardBody>

        <CardFooter></CardFooter>
      </Stack>
    </Card>
  );
}

export default ProductDetail;
