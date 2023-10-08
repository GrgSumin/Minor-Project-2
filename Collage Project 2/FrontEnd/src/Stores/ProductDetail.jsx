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
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useDispatchCart, UseCart } from "./Contextreducer";
import { useCartContext } from "../context/CartContext";

// import ReactImageZoom from "react-image-zoom";

function ProductDetail() {
  let dispatch = useDispatchCart();

  const { cartProducts, setCartProducts } = useCartContext();
  let datas = UseCart();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const product = location.state;
  const [reviewMessage, setReviewMessage] = useState("");
  const [allReview, setAllReviews] = useState([]);
  const [qty, setQty] = useState(1);

  const getAllReview = async () => {
    axios
      .get(
        `http://localhost:4000/api/review/getReviewbyProductID/${product._id}`
      )
      .then((response) => {
        setAllReviews(response.data);
      });
  };
  useEffect(() => {
    getAllReview();
  }, []);

  const addReview = async (productID) => {
    axios
      .post("http://localhost:4000/api/review/addReviewProduct", {
        productID,
        Message: reviewMessage,
        stats: "4",
      })
      .then((response) => {
        setReviewMessage("");
        getAllReview();
      });
  };
  const handleAddToCart = async (productID) => {
    axios.post("http://localhost:4000/api/cart/addCart", {
      productID,
      userID: localStorage.getItem("id"),
    });
    setCartProducts((prev) => [...prev, product]);
  };

  return (
    <>
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
        <Stack>
          <CardBody style={{ margin: "10px" }}>
            <Heading
              style={{
                fontFamily: "cursive",
                fontSize: 30,
              }}
            >
              {product.title}
            </Heading>
            <Image
              boxSize="100px"
              objectFit="cover"
              src={`http://localhost:4000/static/${product.Image}`}
            />
            <Text
              style={{
                fontFamily: "cursive",
                fontSize: 20,
              }}
            >
              {product.Brand}
            </Text>
            <Text
              style={{
                fontFamily: "cursive",
                fontSize: 20,
              }}
            >
              Rs {product.Price}
            </Text>
            <div style={{ display: "flex", gap: 10 }}>
              <Text
                style={{
                  fontFamily: "cursive",
                  fontSize: 20,
                }}
              >
                Quantity {product.Quantity}
              </Text>
              <NumberInput
                defaultValue={0}
                min={0}
                max={10}
                onChange={() => setQty(e.target.value)}
              >
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
              {product.Description}
            </Text>
            <div style={{ display: "flex", gap: 10 }}>
              <Link to="/cart">
                <Button variant="solid" colorScheme="teal">
                  Buy Now
                </Button>
              </Link>
              <Button
                variant="solid"
                colorScheme="yellow"
                onClick={() => handleAddToCart(product._id)}
              >
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
            <Input
              placeholder="Type your review"
              size="lg"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            />
            <div style={{ margin: 10 }}>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  addReview(product._id);
                }}
              >
                Submit
              </Button>
            </div>
          </CardBody>
        </Stack>
      </Card>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Review</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allReview.map((review) => (
              <Tr>
                <Td>{review.Message}</Td>
                <Td>{review.stats}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProductDetail;
