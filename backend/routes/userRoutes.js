const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", protect, isAdmin, ctrl.listUsers);

module.exports = router;
