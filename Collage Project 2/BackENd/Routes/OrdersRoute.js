const express = require("express");
const router = express.Router();
const {
  makeOrder,
  getallOrders,
  getOrder,
  cancelOrder,
} = require("../Controller/OrderCtrl");

router.post("/addorder", makeOrder);
router.get("/getallorder", getallOrders);
router.get("/getorder", getOrder);
router.post("/cancelorder", cancelOrder);

module.exports = router;
