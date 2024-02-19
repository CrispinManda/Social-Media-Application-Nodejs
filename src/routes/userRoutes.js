import { Router } from "express";
import {
  loginUser,
  registerUser,
  deleteUser,
  getAllUsersController,
  getUserByIdController,
  // getSingleUser,
} from "../controllers/userController.js";


const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post("/users/auth/login", loginUser);
userRouter.delete("/users/profile/:id", deleteUser);
userRouter.get("/users/profile/:id", getUserByIdController);
userRouter.get("/users/profile/", getAllUsersController);

export default userRouter;