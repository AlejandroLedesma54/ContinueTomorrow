import { Router } from "express";
import CartController from "../controllers/cartController";
import UserPermissions from "../middlewares/permissions";
import { container } from "tsyringe";

export const cartRouter: Router = Router();
const userPermissions: UserPermissions = container.resolve(UserPermissions);

cartRouter.get("/:id", userPermissions.checkPermissions('readOne', 1), CartController.getCarById);
