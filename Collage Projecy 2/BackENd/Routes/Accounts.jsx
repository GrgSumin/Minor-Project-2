const express = require("express");
const router = express.Router();

const accounts = require("../Controller/Account.jsx");

router.post("/register", accounts.register);
router.post("/login", accounts.login);
router.post("/LoadInfo", accounts.LoadInfo);

module.exports = router;
