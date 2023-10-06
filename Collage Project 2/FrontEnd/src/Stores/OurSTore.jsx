import { Breadcrumb, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";
import axios from "axios";

function OurSTore() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProduct = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/product/getallProduct"
      );
      setProducts(response.data);
    };

    getAllProduct();
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Our Store</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Breadcrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5" style={{}}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card ">
                <h3 className="filter-title">Shop by Categories</h3>
                <div>
                  <ul className="ps-0 ">
                    <li>Guitars</li>
                    <li>Ukulele </li>
                    <li>Bass</li>
                    <li>Keyboards</li>
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter by</h3>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        In stock (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        Out of stock(0)
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="From"
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="To"
                      />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-title">Product tag</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-2">
                    <span className="bagde bg-light text-secondary rounded-3 py-1 px-1">
                      Guitar Accesssories
                    </span>
                    <span className="bagde bg-light text-secondary rounded-3 py-1 px-1">
                      Audio Electronics
                    </span>
                    <span className="bagde bg-light text-secondary rounded-3 py-1 py-1">
                      Amps
                    </span>
                    <span className="bagde bg-light text-secondary rounded-3 py-1 py-1">
                      Mics
                    </span>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random products</h3>
                <div>
                  <div className="random-produts mb-3 d-flex">
                    <div className="w-50">
                      <img
                        src="strings.png"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>Daddario Acoustic Phosphor Bronze EJ15</h5>

                      <b>$20</b>
                    </div>
                  </div>
                  <div className="random-produts d-flex">
                    <div className="w-50">
                      <img src="amp.png" className="img-fluid" alt="watch" />
                    </div>
                    <div className="w-50">
                      <h5>NUX FRONTLINE 15</h5>

                      <b>$20</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <p className="mb-0">SortBy:</p>

                    <select name="" className="form-control form-select " id="">
                      <option value="manual">Featured</option>
                      <option value="best-selling" selected="selected">
                        Best selling
                      </option>

                      <option value="price-ascending">
                        Price, low to high
                      </option>
                      <option value="price-descending">
                        Price, high to low
                      </option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10"></div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="container text-center">
                  <div className="row">
                    {products.map((product) => (
                      <div className="col">
                        <Link to="/detail">
                          <img
                            src={`http://localhost:4000/static/${product.Image}`}
                            alt="amp1"
                            className="cols"
                          />
                          <h6>{product.title}</h6>
                          <ReactStars
                            count={5}
                            size={24}
                            activeColor={"#ffd700"}
                          />
                          <p className="price">Rs {product.Price}</p>
                        </Link>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Link to="/cart">
                            <Button colorScheme="twitter">Buy Now</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurSTore;
