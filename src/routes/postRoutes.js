import { Router } from "express";
import {
  createPostController,
  getAllPostsController,
  deleteSinglePostController,
  getUserPostsController,
} from "../controllers/postsController.js";

const postRouter = Router();

postRouter.post("/posts/createPost", createPostController);
postRouter.post("/posts/getAllPosts", getAllPostsController);
postRouter.post("/posts/:id", deleteSinglePostController);
postRouter.get("/posts/:id", getUserPostsController);







export default postRouter;
