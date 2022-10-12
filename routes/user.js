import express from "express";
import { getAUser, getUser, updateUser } from "../controller/user.js";

const router = express.Router();

router.get("/me", getUser);

router.get("/:userId", getAUser);

router.post("/update", updateUser);

export default router;
