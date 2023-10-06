const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategories,
} = require("../Controller/CategoryCtrl");
const router = express.Router();

router.post("/createCategory", createCategory);
router.post("/updateCategory", updateCategory);
router.post("/deleteCategory", deleteCategory);
router.get("/getCategory/:CategoryId", getCategory);
router.get("/getallCategory", getallCategories);

module.exports = router;
