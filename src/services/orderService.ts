import { OrderModel, UserModel } from "../models";
import OrderRepository from "../repositories/orderRepository";
import CartRepository from "../repositories/cartRepository";
import ProductCartRepository from "../repositories/productCartRepository";
import ProductRepository from "../repositories/productRepository";
import { injectable , inject} from "tsyringe";

@injectable()
export default class OrderService{
    constructor(
        @inject('OrderRepository') private orderRepository: OrderRepository,
        @inject('CartRepository') private cartRepository: CartRepository,
        @inject('ProductCartRepository') private productCartRepository: ProductCartRepository,
        @inject('ProductRepository') private productRepository: ProductRepository
){}

    async createOrder(user: UserModel,order: Partial<OrderModel>): Promise<OrderModel>{       
        order.userId = user.id
        order.cartId = user.cartId  
        
        const cart = await this.cartRepository.findCartById(user.cartId)
        if(!cart) throw new Error('Cart not found')
        
        const totalOrder = cart.total

        order.total = totalOrder

        return await this.orderRepository.create(order)
    }

    async updateOrder(id: number, order: Partial<OrderModel>){
        return await this.orderRepository.updateOrder(id, order)
    }

    async findAllOrders(){
        return await this.orderRepository.findAll()
    }

    async deleteUser(id:number){
        return await this.orderRepository.deleteOrder(id)
    }

    async getProductsByOrderId(orderId: number){
        const order = await this.orderRepository.findById(orderId);
        if(!order) throw new Error('Order not found')
        
        const cart = await this.cartRepository.findCartById(order.cartId);
        if(!cart) throw new Error('Cart not found')

        const productsCarts = await this.productCartRepository.findByCartId(cart.id)

        const productsIds = productsCarts.map(pc => pc.productId)
        return await this.productRepository.findByIds(productsIds)    
    }

    async getOrderByUserId(userId: number){
        return await this.orderRepository.findByUserId(userId)
    }

}