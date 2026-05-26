const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/productController");
const upload = require("../middleware/upload");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", ctrl.listProducts);
router.get("/:id/related", ctrl.getRelated);
router.get("/:id", ctrl.getProduct);
router.post("/", protect, isAdmin, upload.single("image"), ctrl.createProduct);
router.put("/:id", protect, isAdmin, upload.single("image"), ctrl.updateProduct);
router.delete("/:id", protect, isAdmin, ctrl.deleteProduct);

module.exports = router;
