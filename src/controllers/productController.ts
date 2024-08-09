import ProductService from "../services/productService";
import { container } from "tsyringe";
import { Request , Response} from "express";
import { ProductModel } from "../models";

export default class ProductController{
    static async createNewProduct(req: Request, res: Response): Promise < Response | undefined >{
        try{
            const newProduct = req.body;
            const user = req.body.user;
            if(!newProduct) return res.status(500).json({status: 500, message: "Invalid product"})
            const productService: ProductService = container.resolve(ProductService);
            const createdProduct = await productService.createProduct(newProduct)
            res.status(201).json({
                status: 201,
                product: createdProduct,
                user
            })
        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }
    
    static async getAllProducts(req: Request, res: Response):  Promise < Response | undefined >{
        try{
            const productService: ProductService = container.resolve(ProductService);
            const products: ProductModel[] = await productService.findAllProducts();
            const user = req.body.user;
            return res.status(200).json({
                status: 200,
                products: products,
                user
            })

        } catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async updateProduct(req: Request, res: Response):  Promise < Response | undefined >{
        try{
            const id: number = parseInt(req.params.id)
            const newProduct: Partial<ProductModel> = req.body
            const productService: ProductService = container.resolve(ProductService);
            const updateProduct = await productService.updateProduct(id, newProduct);
            return res.status(200).json({
                status: 200,
                updateProduct
            })
        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async deleteProduct(req:Request, res:Response){
        try{
            const id: number = parseInt(req.params.id);
            const productService: ProductService = container.resolve(ProductService);
            const deletedCount: number = await productService.deleteProduct(id)
            if(deletedCount === 0){
               return res.status(404).json({
                    status: 404,
                    message: 'Product not found'
                });
            }
            res.status(200).json({
                status: 200,
                message: 'Product deleted'
            });

        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
        
    }

    static async updateProductStock(req: Request, res: Response){
        try{
            const productService: ProductService = container.resolve(ProductService);
            const id: number = parseInt(req.params.id);
            const stockObj: Partial<ProductModel> =  req.body;
            const stockToUpdate : number    = stockObj.stock as number
            
            const updatedStock = await productService.updateStock(id, stockToUpdate);
            res.status(200).json({
                status: 200,
                message: "Stock updated successfully"
            })

        }catch(err:any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }


}