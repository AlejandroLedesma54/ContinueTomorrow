import { injectable } from "tsyringe";
import { ProductModel } from "../models";


@injectable()
export default class ProductRepository{
    async create(product: Partial<ProductModel> ): Promise<ProductModel>{
        return await ProductModel.create(product as ProductModel)
    }

    async findAll():Promise<ProductModel[]>{
        return await ProductModel.findAll()
    }

    async updateProduct(id: number, newProduct: Partial<ProductModel>){
        return await ProductModel.update(newProduct, {where: {id}});
    }

    async deleteProduct(id: number){
        return await ProductModel.destroy({where: {id: id}})
    }

    async updateProductStock(id: number, newStock: number){
        return await ProductModel.update(
            { stock: newStock },
            { where: {id: id} }
        )
    }

    async findProductById(id: number){
        return await ProductModel.findByPk(id)
    }
    
    async findByIds(productIds: number[]): Promise<ProductModel[]> {
        return ProductModel.findAll({ where: { id: productIds } });
    }

}