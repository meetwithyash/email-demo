const express = require("express");
const { registerUser } = require("../controllers/userController");

const router = new express.Router();

router.post("/user/register", registerUser);

module.exports = router;