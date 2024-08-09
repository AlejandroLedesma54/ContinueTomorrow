import { container } from "tsyringe";
import { Request, Response } from "express";
import { config } from "dotenv";
import { resolve } from "path";
import jwt from "jsonwebtoken";
import UserService from "../services/userService";
import CartService from "../services/cartService";

config({path: resolve(__dirname, "../../.env")});

class AuthController{
 
    static async registerNewUser(req: Request, res: Response): Promise < Response | undefined >{
        try{
            const newUser = req.body
            if(!newUser) return res.status(500).json({status: 500, message: "Invalid product"})
            const userService: UserService = container.resolve(UserService);
            const createdUser = await userService.createUser(newUser)
            res.status(201).json({
                status: 201,
                user: createdUser
            })

        }catch(err:any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async login(req: Request, res:Response){
        try{
        const {email, password} = req.body;
        const userService = container.resolve(UserService);
        const user = await userService.checkUserCredentials(email, password);
        if(!user || !user.id || !user.roleId || !user.cartId){ 
            return res.status(401).json({
                status: 401,
                message: "Invalid credentials"
            });
        }
        const token  = AuthController.generateToken({id: user.id, roleId: user.roleId, cartId: user.cartId})
        res.status(200).json({
            token});
        
        }catch(err: any){
            res.status(401).json({
                status: 401,
                message: err.message});
        }
    }

    static generateToken(user: {id: number; roleId: number; cartId: number}): any {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("Please provide a JWT secret!");
        }
        const token = jwt.sign(user, secret, { expiresIn: "1h" });
        return token;
    }

    
}

export default AuthController;