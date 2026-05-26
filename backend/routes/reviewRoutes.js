const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.get("/product/:productId", ctrl.listByProduct);
router.post("/product/:productId", protect, ctrl.upsertReview);
router.delete("/:id", protect, ctrl.deleteReview);

module.exports = router;
