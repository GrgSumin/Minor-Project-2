import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import axios from "axios";

function Cart() {
  const { cartProducts, setCartProducts } = useCartContext();
  const totalProductPrice = cartProducts.reduce((accumulator, product) => {
    return accumulator + +product.Price;
  }, 0);
  console.log(cartProducts);
  // const getAllCartProduct = async () => {
  //   axios
  //     .get(`http://localhost:4000/api/cart/getCart`, {
  //       userID: localStorage.getItem("id"),
  //     })
  //     .then((response) => {
  //       setCartProducts(response.data.productID);
  //     });
  // };
  // useEffect(() => {
  //   getAllCartProduct();
  // }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <section className="cart-wrapper home-wrapper-2 py-r">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div
                className="cart-header py-3 d-flex justify-content-between align-items-center"
                style={{ fontFamily: "cursive" }}
              >
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                {/* <h4 className="cart-col-3">Quantity</h4> */}
              </div>
              {cartProducts?.map((product) => (
                <div
                  className="cart-data py-3  d-flex justify-content-between align-items-center"
                  style={{ fontFamily: "cursive" }}
                >
                  <div className="cart-col-1 gap-20 d-flex align-items-center">
                    <div className="w-25">
                      <img
                        src={`http://localhost:4000/static/${product.Image}`}
                        alt="pedal"
                      />
                    </div>
                    <div className="w-75">
                      <h5 className="model">{product.title}</h5>
                      <p className="Brand">{product.Brand}</p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">Rs {product.Price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-25">
                    <div>
                      <MdDelete className="text-danger" />
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <Link to="/store">
                  <div className="d-flex justify-content-between">
                    <Button colorScheme="teal" size="lg">
                      Continue Shopping
                    </Button>
                    <div>
                      <h4>SubTotal:Rs {totalProductPrice}</h4>
                      <Link to="/payment">
                        <Button colorScheme="facebook" size="lg">
                          Checkout
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
