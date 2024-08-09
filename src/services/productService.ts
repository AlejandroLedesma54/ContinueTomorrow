import { ProductModel } from "../models";
import ProductRepository from "../repositories/productRepository";
import { injectable , inject} from "tsyringe";

@injectable()
export default class ProductService { 
    constructor(@inject('ProductRepository') private productRepository: ProductRepository){}

    async createProduct(product: Partial<ProductModel>): Promise<ProductModel>{
        return await this.productRepository.create(product)
    }

    async findAllProducts(): Promise<ProductModel[]>{
        return await this.productRepository.findAll()
    }

    async updateProduct(id: number, product: Partial<ProductModel>){
        return await this.productRepository.updateProduct(id, product)
    }

    async deleteProduct(id: number){
        return await this.productRepository.deleteProduct(id)
    }

    async updateStock(id: number, newStock: number){
        return await this.productRepository.updateProductStock(id, newStock)
    }

}