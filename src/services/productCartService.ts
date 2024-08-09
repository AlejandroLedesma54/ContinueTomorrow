import { ProductCart } from "../models";
import ProductCartRepository from "../repositories/productCartRepository";
import { injectable, inject } from "tsyringe";
import ProductRepository from "../repositories/productRepository";
import UserRepository from "../repositories/userRepository";
import CartRepository from "../repositories/cartRepository";

@injectable()
export default class ProductCartService {
    constructor(
        @inject('ProductCartRepository') private productCartRepository: ProductCartRepository,
        @inject('UserRepository') private userRepository: UserRepository,
        @inject('ProductRepository') private productRepository: ProductRepository,
        @inject('CartRepository') private cartRepository: CartRepository

    ) { }

    async createProducCart(productCart: Partial<ProductCart>): Promise<(number | ProductCart)[]>{
        const productId = productCart.productId;

        if (!productId) throw new Error("Please provide product id");

        const product = await this.productRepository.findProductById(productId);
        console.log(product);
        if (!product) throw new Error("Product not found");

        const productStock = product.stock;

        if (!productCart.quantity) throw new Error("Please provide quantity");

        if (productStock < productCart.quantity) throw new Error("Not enough stock");
        const total = productCart.quantity * product.price;
        

        const newProductStock = productStock - productCart.quantity;

        await this.productRepository.updateProductStock(productId, newProductStock);

        if (!productCart.cartId) throw new Error("Please provide cart id");

        const cart = await this.cartRepository.findCartById(productCart.cartId);

        if (!cart) throw new Error("Cart not found");
        
        const totalCart = cart.total

        const newTotalCart =  total + totalCart;
        
        await this.cartRepository.updateTotal(productCart.cartId, newTotalCart);

        const productCartCreated = await this.productCartRepository.create(productCart)
        return  [total, productCartCreated]
    }

    async deleteProduct(id: number) {
        return await this.productCartRepository.deleteProductCart(id)
    }

    async updateQuantity(id: number, newQuantity: number) {
        return await this.productCartRepository.updateProductQuantity(id, newQuantity)
    }

    async getAllProductCartByUserId(userId: number){
        const user = await this.userRepository.findUserById(userId);
        if(!user) throw new Error('User not found');
        const cartId = user.cartId;
        if(!cartId) throw new Error('Cart not found');
        return await this.productCartRepository.findByCartId(cartId);
    }
}