import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import Marquee from "react-fast-marquee";

function Brands() {
  return (
    <>
      <div>
        <h
          style={{
            
            display: "flex",
            justifyContent: "center",
            fontFamily: "cursive",
            fontSize: 20,
          }}
        >
          Our Brands
        </h>
        <section className="marque-wrapper py-5" style={{margin:"auto"}}>
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="marquee-inner-wrapper card-wrapper">
                  <Marquee className="d-flex">
                    <div
                      style={{
                        display: "flex",
                        gap: 100,
                        boxShadow: " 0 0 10px #0000001a",
                      }}
                    >
                      <div>
                        <img
                          src="./GuitarCenter.png"
                          alt="brands"
                          width="90"
                          height="94"
                        />
                      </div>
                      <div>
                        <img
                          src="Marshalls.png"
                          alt="brands"
                          width="90"
                          height="94"
                        />
                      </div>
                      <div>
                        <img src="dd.png" alt="brands" width="90" height="94" />
                      </div>
                      <div>
                        <img
                          src="Gib.png"
                          alt="brands"
                          width="90"
                          height="94"
                        />
                      </div>
                      <div>
                        <img
                          src="epiphone-logo.png"
                          alt="brands"
                          width="90"
                          height="94"
                        />
                      </div>
                      <div>
                        <img
                          src="6cp5aX69i.jpg"
                          alt="brands"
                          width="90"
                          height="94"
                        />
                      </div>
                      <div>
                        <img
                          src="jackson-logo-png-transparent.png"
                          alt="brands"
                          width="90"
                          height="94"
                        />
                      </div>
                    </div>
                  </Marquee>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Brands;
