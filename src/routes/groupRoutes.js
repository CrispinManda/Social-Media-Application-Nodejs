import { Router } from "express";
import { createGroupController,joinGroupController } from "../controllers/groupController.js";

const groupRouter = Router();

groupRouter.post("/groups/createGroup", createGroupController);
groupRouter.post("/groups/joinGroup", joinGroupController);

export default groupRouter;
