import { Router } from "express";
import ProductController from "../controllers/productController";
import UserPermissions from "../middlewares/permissions";
import { container } from "tsyringe";

export const productRouter: Router= Router();

const userPermissions: UserPermissions = container.resolve(UserPermissions);

productRouter.post("/", userPermissions.checkPermissions('create', 4), ProductController.createNewProduct);
productRouter.get("/", userPermissions.checkPermissions('read', 4), ProductController.getAllProducts);
productRouter.put("/:id", userPermissions.checkPermissions('update', 4),ProductController.updateProduct)
productRouter.patch("/:id",  userPermissions.checkPermissions('update', 4), ProductController.updateProductStock)
productRouter.delete("/:id", userPermissions.checkPermissions('delete', 4), ProductController.deleteProduct)


