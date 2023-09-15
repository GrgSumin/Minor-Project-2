import React from "react";
import { Helmet } from "react-helmet";

function OurSTore() {
  return (
    <div>
      <h1>Welcome</h1>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </div>
  );
}

export default OurSTore;
