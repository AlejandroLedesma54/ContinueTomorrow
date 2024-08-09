import { injectable } from "tsyringe";
import { OrderModel, ProductModel } from "../models";

@injectable()
export default class OrderRepository{
    async create(order: Partial<OrderModel> ): Promise<OrderModel>{
        return await OrderModel.create(order as OrderModel)
    }

    async updateOrder(id: number, newOrder: Partial<OrderModel>){
        return await OrderModel.update(newOrder, {where: {id}});
    }

    async deleteOrder(id: number){
        return await OrderModel.destroy({where: {id: id}})
    }

    async findAll():Promise<OrderModel[]>{
        return await OrderModel.findAll()
    }

    async findById(id: number): Promise<OrderModel | null>{
        return await OrderModel.findByPk(id)
    }

    async findByUserId(userId: number): Promise<OrderModel[]>{
        return await OrderModel.findAll({where: {userId}})
    }

}