import React from "react";
import { NavLink } from "react-router-dom";
import { FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer
        style={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid",
          padding: "10px",
          boxShadow: "5px 10px black",
          margin: "auto",
        
        }}
      >
        <div
          style={{
            height: "17vh",
            width: "50px",
            display: "flex",
            gap: 500,
          }}
        >
          <div
            style={{
              margin: 15,
            }}
          >
            <h1
              style={{
                fontFamily: "cursive",
                fontSize: 20,
              }}
            >
              InstrumentMania
            </h1>
            <p>
              InstrumentMania is a famous guitar store in Nepal which is located
              at various palces in Nepal
            </p>
          </div>
          <div
            style={{
              right: "50%",
            }}
          >
            <h2 style={{ fontFamily: "cursive", fontSize: 20 }}>Follow Us</h2>
            <div
              style={{
                display: "flex",
                gap: 10,
                fontSize: 30,
              }}
            >
              <div>
                <FaDiscord />
              </div>
              <div>
                <FaInstagram />
              </div>
              <div>
                <FaFacebook />
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "cursive", fontSize: 20 }}>Contact Us</h2>
            <a href="tel:+977-9816649863">+977-9816649863</a>
          </div>
        </div>
        <div>
          <hr />
          <div>
            <p
              style={{
                fontFamily: "cursive",
                fontSize: 20,
                display: "flex",
                justifyContent: "center",
              }}
            >
              @{new Date().getFullYear} InstrumentMaina. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
