import OrderService from "../services/orderService";
import { container } from "tsyringe";
import { Request, Response} from "express";
import { OrderModel, UserModel } from "../models";


export default class OrderController{

    static async getAllOrders(_: Request, res: Response):  Promise < Response | undefined >{
        try{
            const orderService: OrderService = container.resolve(OrderService);
            const orders: OrderModel[] = await orderService.findAllOrders();
            return res.status(200).json({
                status: 200,
                orders: orders
            })

        } catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async createNewOrder(req: Request, res: Response){
        try{
            const newOrder: OrderModel = req.body;
            const user: UserModel = req.body.user
            const orderService: OrderService = container.resolve(OrderService);
            const order: OrderModel = await orderService.createOrder(user, newOrder)
            res.status(201).json({
                status: 201,
                order: order
            })
        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async updateOrder(req: Request, res: Response):  Promise < Response | undefined >{
        try{
            const id: number = parseInt(req.params.id)
            const newOrder: Partial<OrderModel> = req.body
            const orderService: OrderService = container.resolve(OrderService);
            const updateOrder = await orderService.updateOrder(id, newOrder)
            return res.status(200).json({
                status: 200,
                updateOrder
            })
        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async deleteOrder(req:Request, res:Response){
        try{
            const id: number = parseInt(req.params.id);
            const orderService: OrderService = container.resolve(OrderService);
            const deletedCount: number = await orderService.deleteUser(id)
            if(deletedCount === 0){
               return res.status(404).json({
                    status: 404,
                    message: 'Product not found'
                });
            }
            res.status(200).json({
                status: 200,
                message: 'Order deleted'
            });

        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
        
    }

   
    static async getProductsByOrderId(req: Request, res: Response){
        try{
            const orderId: number = parseInt(req.params.orderId);
            const orderService: OrderService = container.resolve(OrderService);
            const products = await orderService.getProductsByOrderId(orderId)
            res.status(200).json({
                status: 200,
                products
            })
        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async getOrderByUserId(req: Request, res: Response){
        try{
            const userId: number = parseInt(req.params.userId);
            const orderService: OrderService = container.resolve(OrderService);
            const orders = await orderService.getOrderByUserId(userId)
            res.status(200).json({
                status: 200,
                orders
            })
        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

}