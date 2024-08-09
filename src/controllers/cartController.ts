import CartRepository from "../repositories/cartRepository";
import CartService from "../services/cartService";
import { container } from "tsyringe";
import { Request, Response } from "express";

export default class CartController {
    static async getCarById(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const id: number = parseInt(req.params.id)
            const cartRepository: CartRepository = container.resolve(CartRepository);
            const cart = await cartRepository.findCartById(id)
            return res.status(200).json({
                status: 200,
                cart: cart
            })
        } catch (err: any) {
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }
}