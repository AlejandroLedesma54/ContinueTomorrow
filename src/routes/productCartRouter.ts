import ProductCartController from "../controllers/productCartController";
import { Router } from "express";
import { container } from "tsyringe";
import UserPermissions from "../middlewares/permissions";

export const productCartRouter: Router = Router();
const userPermissions: UserPermissions = container.resolve(UserPermissions);

productCartRouter.post("/", userPermissions.checkPermissions('create', 3), ProductCartController.createNewProductCart );
productCartRouter.patch("/:id", userPermissions.checkPermissions('update', 3), ProductCartController.updateProductQuantity );
productCartRouter.delete("/:id", userPermissions.checkPermissions('delete', 3), ProductCartController.deleteProduct);
productCartRouter.get("/:userId/users", userPermissions.checkPermissions('readOne', 3), ProductCartController.getProductsCartsByUserIdAdmin);
productCartRouter.get("/users", userPermissions.checkPermissions('readOne', 3), ProductCartController.getProductsCartsByUserIdClient);