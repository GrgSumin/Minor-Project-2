const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/brandController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", ctrl.list);
router.post("/", protect, isAdmin, ctrl.create);
router.put("/:id", protect, isAdmin, ctrl.update);
router.delete("/:id", protect, isAdmin, ctrl.remove);

module.exports = router;
