import express from "express";
import { checkAuth, login, signup } from "../controllers/auth.controller.js";
import {authMiddle} from "../middlewares/authMiddle.js"
const authRouter = express.Router()

authRouter.post("/login",login)
authRouter.post("/signup",signup)
authRouter.get("/check",authMiddle,checkAuth)

export default authRouter