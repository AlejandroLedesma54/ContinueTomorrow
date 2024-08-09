import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    HasOne,
} from 'sequelize-typescript';
import { UserModel } from './userModel';
import { ProductCart } from './productCartModel';
import { OrderModel } from './orderModel';

@Table({
    tableName: "carts",
    timestamps: true
})

export class CartModel extends Model<CartModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.DECIMAL(12,2)
    })
    total!: number;

    @HasMany(() => ProductCart)
    products!: ProductCart[];

    @HasOne(() => UserModel)
    users!: UserModel

    @HasOne(() => OrderModel)
    order!: OrderModel

}