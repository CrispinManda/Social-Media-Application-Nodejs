import { Router } from "express";
import { createPostController } from "../controllers/PostsController.js";

const postRouter = Router();

postRouter.post("/posts/createPost", createPostController);






export default postRouter;
