import { Router } from "express";
import UserController from "../controllers/userController";
import { container } from "tsyringe";
import UserPermissions from "../middlewares/permissions";

export const userRouter: Router = Router();
const userPermissions: UserPermissions = container.resolve(UserPermissions);

userRouter.get("/", userPermissions.checkPermissions('read', 5), UserController.getAllUsers);
userRouter.put("/:id", userPermissions.checkPermissions('update', 5), UserController.updateUser)
userRouter.delete("/:id", userPermissions.checkPermissions('delete', 5), UserController.deleteUser);
