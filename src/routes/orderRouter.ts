import { Router } from "express";
import OrderController from "../controllers/orderController";
import { container } from "tsyringe";
import UserPermissions from "../middlewares/permissions";

export const orderRouter = Router();
const userPermissions = container.resolve(UserPermissions);

orderRouter.post("/", userPermissions.checkPermissions('create', 2), OrderController.createNewOrder);
orderRouter.get("/", userPermissions.checkPermissions('read', 2), OrderController.getAllOrders);
orderRouter.put("/:id", userPermissions.checkPermissions('update', 2), OrderController.updateOrder);
orderRouter.delete("/:id", userPermissions.checkPermissions('delete', 2), OrderController.deleteOrder);
orderRouter.get("/:orderId/products", userPermissions.checkPermissions('readOne', 2), OrderController.getProductsByOrderId);
orderRouter.get("/:userId/:users", userPermissions.checkPermissions('readOne', 2), OrderController.getOrderByUserId);