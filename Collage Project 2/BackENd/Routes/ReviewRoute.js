const express = require("express");
const router = express.Router();

const { getReviewbyProductId, createProduct } = require("../Controller/Review");

router.get("/getReviewbyProductID/:productId", getReviewbyProductId);
router.post("/addReviewProduct", createProduct);

module.exports = router;
