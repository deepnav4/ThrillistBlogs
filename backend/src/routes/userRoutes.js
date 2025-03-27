const express = require("express");
const router = express.Router();
const {signup} = require("../controllers/user.js");
const {login} = require("../controllers/user.js");
const {getUser} = require("../controllers/user.js");
router.post("/signup",signup);
router.post("/login",login);
router.get("/profile",getUser);

module.exports = router;