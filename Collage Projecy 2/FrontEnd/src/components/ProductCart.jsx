import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function ProductCart() {
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "cursive",
        }}
      >
        Featured Products
      </h1>
      <div className="collection">
        <div className="col-2">
          <div className="product-card position-relative">
            <div className="wishlist-icon position-absolute">
              <GrFavorite />
            </div>

            <div className="d-flex position-absolute">
              <Link to="/cart">
                <FiShoppingCart />
              </Link>
            </div>

            <div className="d-flex1 position-absolute">
              <Link to="/Productdetail">
                <AiFillEye />
              </Link>
            </div>

            <div className="product-image">
              <img src="Gibson1.jpg" alt="guitar" />
            </div>
            <div className="product-detail">
              <h6 className="brand">Gibson</h6>
              <h5 className="brand">Lespaul classic</h5>
              <ReactStars count={5} size={24} activeColor="#ffd700" />
              <p className="price">Rs120000</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to="/cart">
                <Button colorScheme="twitter">BuyNow</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="product-card position-relative">
            <div className="wishlist-icon position-absolute">
              <GrFavorite />
            </div>

            <div className="d-flex position-absolute">
              <Link to="/cart">
                <FiShoppingCart />
              </Link>
            </div>

            <div className="d-flex1 position-absolute">
              <Link to="/Productdetail">
                <AiFillEye />
              </Link>
            </div>

            <div className="product-image">
              <img src="Gibson1.jpg" alt="guitar" />
            </div>
            <div className="product-detail">
              <h6 className="brand">Gibson</h6>
              <h5 className="brand">Lespaul classic</h5>
              <ReactStars count={5} size={24} activeColor="#ffd700" />
              <p className="price">Rs120000</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to="/cart">
                <Button colorScheme="twitter">BuyNow</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
