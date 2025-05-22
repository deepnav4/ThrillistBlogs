import express from "express";
const router = express.Router();
import {signup} from "../controllers/user.js";
import {login} from "../controllers/user.js";
import {getUser} from "../controllers/user.js";
router.post("/signup",signup);
router.post("/login",login);
router.get("/profile",getUser);

export default router;