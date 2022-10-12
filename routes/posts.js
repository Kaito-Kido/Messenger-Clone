import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controller/posts.js";
import { validateToken } from "../JWT.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", createPost);

router.post("/update", updatePost);

router.post("/delete", deletePost);

export default router;
