import { Router } from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";

const router = Router();

// Tutorial specific routes
router.route("/create").post(createPost);
router.route("/getPosts").get(getPosts);
router.route("/update/:id").patch(updatePost);
router.route("/delete/:id").delete(deletePost);

// RESTful standard aliases
router.route("/").post(createPost);
router.route("/").get(getPosts);
router.route("/:id").patch(updatePost);
router.route("/:id").delete(deletePost);

export default router;
