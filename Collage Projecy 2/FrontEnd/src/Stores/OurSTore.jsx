import React from "react";
import { Helmet } from "react-helmet";

function OurSTore() {
  return (
    <div>
      <h1>Welcome</h1>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Our Store</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="store-wrapper home-wrapper py-5">
        <div className="container xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3"></div>
              <div className="filter-card mb-3"></div>
              <div className="filter-card mb-3"></div>
              <div className="filter-card mb-3"></div>
            </div>
            <div className="col-9"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurSTore;
