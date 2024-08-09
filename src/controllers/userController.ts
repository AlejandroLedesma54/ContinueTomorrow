import UserService from "../services/userService";
import { container } from "tsyringe";
import { Request, Response} from "express";
import { UserModel } from "../models";

export default class UserController{
  
    static async getAllUsers(_: Request, res: Response):  Promise < Response | undefined >{
        try{
            const userService: UserService = container.resolve(UserService);
            const users: UserModel[] = await userService.findAllUsers();
            return res.status(200).json({
                status: 200,
                users: users
            })

        } catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async updateUser(req: Request, res: Response):  Promise < Response | undefined >{
        try{
            const id: number = parseInt(req.params.id)
            const newUser: Partial<UserModel> = req.body
            const userService: UserService = container.resolve(UserService);
            const updatedUser = await userService.updateUser(id, newUser);
            return res.status(200).json({
                status: 200,
                updatedUser
            })
        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    static async deleteUser(req:Request, res:Response){
        try{
            const id: number = parseInt(req.params.id);
            const userService: UserService = container.resolve(UserService);
            const deletedCount: number = await userService.deleteUser(id);
            if(deletedCount === 0){
               return res.status(404).json({
                    status: 404,
                    message: 'User not found'
                });
            }
            res.status(200).json({
                status: 200,
                message: 'User deleted'
            });

        }catch(err: any){
            res.status(500).json({
                status: 500,
                message: err.message
            })
        }
        
    }



}