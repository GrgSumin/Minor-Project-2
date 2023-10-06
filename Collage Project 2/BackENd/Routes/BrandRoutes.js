const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrands,
} = require("../Controller/BrandCtrl");
const router = express.Router();

router.post("/createBrand", createBrand);
router.post("/updateBrand", updateBrand);
router.post("/deleteBrand", deleteBrand);
router.get("/getBrand/:BrandId", getBrand);
router.get("/getallBrand", getallBrands);

module.exports = router;
