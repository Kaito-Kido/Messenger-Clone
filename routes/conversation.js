import express from "express";
import {
  getConversation,
  postConversation,
} from "../controller/conversation.js";

const router = express.Router();

router.post("/", postConversation);

router.get("/:userId", getConversation);

export default router;
