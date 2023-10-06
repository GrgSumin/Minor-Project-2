const express = require("express");
const router = express.Router();

const {
  addFavorite,
  getFavProduct,
  removeFavProduct,
} = require("../Controller/Favorite");

router.post("/addFavorite", addFavorite);
router.post("/getFavproduct", getFavProduct);
router.post("/removeFavproduct", removeFavProduct);

module.exports = router;
