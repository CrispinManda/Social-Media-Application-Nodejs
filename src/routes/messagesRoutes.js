import { Router } from "express";
import {
  createMessageController,
  deleteMessageController,
  deleteSingleMessageController,
} from "../controllers/messagesController.js";

const messageRouter = Router();

messageRouter.post("/message/createMessage", createMessageController);
messageRouter.post("/message/deleteMessage", deleteMessageController);
messageRouter.delete("/message/:message_id",deleteSingleMessageController);




export default messageRouter;
