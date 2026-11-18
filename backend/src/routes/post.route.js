import { Router } from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";

const router = Router();

// tutorial endpoints
router.route("/create").post(createPost);
router.route("/getPosts").get(getPosts);
router.route("/update/:id").patch(updatePost);
router.route("/delete/:id").delete(deletePost);

// restful aliases
router.route("/").post(createPost);
router.route("/").get(getPosts);
router.route("/:id").patch(updatePost);
router.route("/:id").delete(deletePost);

export default router;
