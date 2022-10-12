import express from "express";
import { getMessage, postMessage } from "../controller/message.js";

const router = express.Router();

router.post("/", postMessage);

router.get("/:conversationId", getMessage);

export default router;
