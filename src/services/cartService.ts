import { CartModel } from "../models";
import CartRepository from "../repositories/cartRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export default class CartService{
    constructor(
        @inject("CartRepository") private cartRepository: CartRepository
    ){}

    async createCart(cart: Partial<CartModel>){
        return await this.cartRepository.create(cart)
    }

    async findCartById(id: number){
        return await this.cartRepository.findCartById(id)
    }

}