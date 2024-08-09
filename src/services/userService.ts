import bcrypt from 'bcrypt';
import { CartModel, UserModel } from "../models";
import { injectable, inject } from "tsyringe";
import UserRepository from "../repositories/userRepository";
import { container } from "tsyringe";
import CartService from "./cartService";

@injectable()
export default class UserService{
    constructor(@inject('UserRepository') private userReposiroty: UserRepository){}

    async createUser(user: Partial<UserModel>): Promise<UserModel>{
        const cartService : CartService =  container.resolve(CartService);
        const cart: CartModel = await cartService.createCart({total: 0})
        user.cartId = cart.id
        if(!user.password) throw new Error('Password is required');
        user.password = await bcrypt.hash(user.password, 10)
        return await this.userReposiroty.create(user)
    }

    async updateUser(id: number, user: Partial<UserModel>){
        return await this.userReposiroty.updateUser(id, user)
    }

    async findAllUsers(){
        return await this.userReposiroty.findAll()
    }

    async deleteUser(id:number){
        return await this.userReposiroty.deleteUser(id)
    }

    async checkUserCredentials(email:string, password: string): Promise<Partial<UserModel> | undefined>{
        const user = await this.userReposiroty.findByEmail(email);
        console.log(user?.password);
        
        if(!user) throw new Error('Invalid credentials');
        const passwordMatch = await bcrypt.compare(password, user.password)
        console.log(passwordMatch);
        
        if(user &&  passwordMatch){
            return user;
        }
        throw new Error('Invalid credentials');
    }

}