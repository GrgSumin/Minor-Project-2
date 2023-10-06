const express = require("express");
const router = express.Router();

const { addCart, getCart, removeCart } = require("../Controller/CartCtrl");

router.post("/addCart", addCart);
router.get("/getCart", getCart);
router.delete("/removeCart/:id", removeCart);

module.exports = router;
