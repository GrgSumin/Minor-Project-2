const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/orderController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/", protect, ctrl.createOrder);
router.get("/mine", protect, ctrl.myOrders);
router.get("/", protect, isAdmin, ctrl.listAllOrders);
router.get("/:id", protect, ctrl.getOrder);
router.put("/:id/status", protect, isAdmin, ctrl.updateStatus);

module.exports = router;
