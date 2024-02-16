import { Router } from "express";
import { createEventController } from "../controllers/eventsController.js";

const eventRouter = Router();

eventRouter.post("/event/createEvent", createEventController);

export default eventRouter;
