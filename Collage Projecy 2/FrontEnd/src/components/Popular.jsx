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

function Popular() {
  return (
    <div>
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "cursive",
          }}
        >
          Hurry Up
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
                <p className="price" style={{ gap: 10 }}>
                  <span>Rs120000</span>

                  <strike>Rs150000</strike>
                </p>
                <p className="price">
                  <span>4 days left</span>
                </p>
                <div className="prod-count" style={{ margin: 5 }}>
                  <p>Product :5</p>

                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
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
                <p className="price" style={{ gap: 10 }}>
                  <span>Rs120000</span>

                  <strike>Rs150000</strike>
                </p>
                <p className="price">
                  <span>4 days left</span>
                </p>
                <div className="prod-count" style={{ margin: 5 }}>
                  <p>Product :5</p>

                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
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
    </div>
  );
}

export default Popular;
