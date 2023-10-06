import { Button } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import {MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";



function Cart() {
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
              <div className="cart-header py-3 d-flex justify-content-between align-items-center" style={{fontFamily:"cursive"}}>
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              <div className="cart-data py-3  d-flex justify-content-between align-items-center" style={{fontFamily:"cursive"}}>
               <div className="cart-col-1 gap-20 d-flex align-items-center">
                <div className="w-25">
                  <img src="zoom.jpg" alt="pedal"/>
                </div>
                <div className="w-75">
                  <h5 className="model">distortion</h5>
                  <p className="Brand">Boss</p>
                  

                </div>
               </div>
               <div className="cart-col-2">
                <h5 className="price">Rs 15000</h5>
               </div>
               <div className="cart-col-3 d-flex align-items-center gap-25">
                <div><input className="form-control" type='number' name="" min={1} max={10}/></div>
                <div><MdDelete className="text-danger" /></div>
               </div>
               <div className="cart-col-4">
               <h5 className="price">Rs 15000</h5>

               </div>
              </div>
              <div>
            <Link to="/store">
              <div className="d-flex justify-content-between">

              <Button colorScheme='teal' size='lg' >Continue Shopping</Button>
              <div>
                <h4>SubTotal:Rs 20000</h4>
                <Link to="/payment">
              <Button colorScheme='facebook' size='lg' >Checkout</Button>
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
