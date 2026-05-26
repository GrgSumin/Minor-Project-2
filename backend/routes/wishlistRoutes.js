const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, ctrl.list);
router.post("/toggle", protect, ctrl.toggle);
router.delete("/:productId", protect, ctrl.remove);

module.exports = router;
