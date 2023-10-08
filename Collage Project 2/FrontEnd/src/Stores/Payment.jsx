import { Button } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

function Payment() {
  const handlePayment = async () => {
    const payload = {
      return_url: "http://localhost:3000/",
      website_url: "http://localhost:3000/",
      amount: 10 * 1000,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "name",
        email: "example@gmail.com",
        phone: "9811496763",
      },
    };
    const response = await axios.post(
      "http://localhost:4000/api/khalti-api",
      payload
    );
    console.log(response);

    if (response) {
      window.location.href = `${response.data?.data?.payment_url}`;
    }
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheckOut</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="checkout-wrapper">
        <div
          className="container-xxl"
          style={{ border: "2px solid lightgray", margin: 80, padding: 20 }}
        >
          <div className="row">
            <div className="col7">
              <div className="checkout-left-data">
                <h3 className="app-name" style={{ fontFamily: "cursive" }}>
                  InstrumentMania
                </h3>
                <h4 className="title" style={{ fontFamily: "cursive" }}>
                  Contact Information
                </h4>
                <p className="user-details" style={{ fontFamily: "cursive" }}>
                  Sumin(sumin@gmail.com)
                </p>
                <form className="d-flex gap-5 flex-wrap justify-content-between">
                  <div className="w-50">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="first Name"
                    />
                  </div>
                  <div className="w-50">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Address"
                  />
                  <input
                    className="form-control"
                    type="text"
                    placeholder="City orvillage"
                  />
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Appartment, suite (optional)"
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart">
                        <IoMdArrowRoundBack className="me-5" />
                        Return to Cart
                      </Link>

                      <Button
                        colorScheme="red"
                        size="lg"
                        onClick={handlePayment}
                      >
                        Paynow
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
