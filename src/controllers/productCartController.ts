import { ProductCart } from './../models/productCartModel';
import ProductCartService from '../services/productCartService';
import { container } from "tsyringe";
import { Request , Response} from "express";


export default class ProductCartController{
    static async createNewProductCart(req:Request, res:Response){
        try{
            const newProductCart = req.body
            const cartId: number = req.body.user.cartId
            newProductCart.cartId = cartId
            const productCartService: ProductCartService = container.resolve(ProductCartService);
            const createProductCart = await productCartService.createProducCart(newProductCart)
            res.status(201).json({
                status: 201,
                total: createProductCart[0],
                productCart: createProductCart[1]
            })
        }catch(err:any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async deleteProduct(req:Request, res:Response){
        try{
            const id: number = parseInt(req.params.id);
            const productCartService: ProductCartService = container.resolve(ProductCartService);
            const deletedCount: number = await productCartService.deleteProduct(id)
            if(deletedCount === 0){
               return res.status(404).json({
                    status: 404,
                    message: 'Product not found'
                });
            }
            res.status(200).json({
                status: 200,
                message: 'Product cart deleted'
            });

        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
        
    }

    static async updateProductQuantity(req: Request, res: Response){
        try{
            const productService: ProductCartService = container.resolve(ProductCartService);
            const id: number = parseInt(req.params.id);
            const quantityObj: Partial<ProductCart> =  req.body;
            const stockToUpdate : number = quantityObj.quantity as number
            
            await productService.updateQuantity(id, stockToUpdate);
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

    
    static async getProductsCartsByUserIdAdmin(req: Request, res: Response): Promise<Response | undefined> {
        try{
        const user = req.body.user;
        if(user.roleId == 1){
            const userId = parseInt(req.params.userId);
            console.log(userId, typeof userId);
            
            const productCartService = container.resolve(ProductCartService);
            const productsCarts = await productCartService.getAllProductCartByUserId(userId);
            return res.status(200).json({
                status: 200,
                user: user,
                productsCarts: productsCarts
            });
        }
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
        }catch(err:any){
            res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }

    static async getProductsCartsByUserIdClient(req: Request, res: Response): Promise<Response | undefined> {
        try{
        const user = req.body.user;
        if(user.roleId === 2){
            const productCartService = container.resolve(ProductCartService);
            const productsCarts = await productCartService.getAllProductCartByUserId(user.id);
            return res.status(200).json({
                status: 200,
                user: user,
                productsCarts: productsCarts
            });
        }
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
        }catch(err:any){
            res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }
}