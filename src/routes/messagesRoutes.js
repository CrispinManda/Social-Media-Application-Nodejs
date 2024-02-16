import { Router } from "express";
import { createMessageController } from "../controllers/messagesController.js";

const messageRouter = Router();

messageRouter.post("/message/createMessage", createMessageController);

export default messageRouter;
