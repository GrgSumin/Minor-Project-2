const express = require("express");
const router = express.Router();

const {
  addPromotion,
  getPromotion,
  updatePromotion,
  removePromotion,
} = require("../Controller/Promotion");

router.post("/addPromotion", addPromotion);
router.post("/getPromotion", getPromotion);
router.post("/removePromotion", removePromotion);
router.post("/updatePromotion", updatePromotion);

module.exports = router;
