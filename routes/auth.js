import express from "express";
import { handleRefresh, login, register, logout } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/refresh", handleRefresh);

router.get("/logout", logout);

export default router;
