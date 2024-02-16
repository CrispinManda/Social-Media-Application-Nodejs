import { Router } from "express";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

import {
  createPostController,
  getAllPostsController,
  deleteSinglePostController,
  getUserPostsController,
  editPostController,
} from "../controllers/postsController.js";

const postRouter = Router();

postRouter.post("/posts/createPost", authMiddleware, createPostController);
postRouter.post("/posts/getAllPosts", getAllPostsController);
postRouter.post("/posts/:id", deleteSinglePostController);
postRouter.get("/posts/:id", getUserPostsController);
postRouter.put("/posts/:id", editPostController);






export default postRouter;
