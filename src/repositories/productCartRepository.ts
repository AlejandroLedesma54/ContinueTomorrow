import { injectable } from "tsyringe";
import { ProductCart } from "../models";

@injectable()
export default class ProductCartRepository{
    async create(productCart: Partial<ProductCart>){
        return await ProductCart.create(productCart as ProductCart )
    }

    async deleteProductCart(id: number){
        return await ProductCart.destroy({where: {id: id}})
    }

    async updateProductQuantity(id: number, newQuantity: number){
        return await ProductCart.update(
            { quantity: newQuantity },
            { where: {id: id} }
        )
    }

    async findByCartId(cartId: number){
        return await ProductCart.findAll({where: {cartId}});
    }


}