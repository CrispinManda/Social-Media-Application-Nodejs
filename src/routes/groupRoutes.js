import { Router } from "express";
import { createGroupController } from "../controllers/groupController.js";

const groupRouter = Router();

groupRouter.post("/groups/createGroup", createGroupController);

export default groupRouter;
