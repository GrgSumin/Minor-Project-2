const express = require("express");
const router = express.Router();

const {register, login, LoadInfo} = require("../Controller/Account");
const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/LoadInfo",LoadInfo);
// router.put("/:id" , updateUser)

module.exports = router;
