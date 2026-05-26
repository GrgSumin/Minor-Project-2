const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/admin-login", ctrl.adminLogin);
router.get("/me", protect, ctrl.me);
router.put("/me", protect, ctrl.updateProfile);

module.exports = router;
