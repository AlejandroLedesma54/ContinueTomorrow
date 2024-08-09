import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from './userModel';
import { CartModel } from './cartModel';

@Table({
    tableName: "orders",
    timestamps: true
})

export class OrderModel extends Model<OrderModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
    })
    userId!: number;

    @ForeignKey(() => CartModel)
    @Column({
        type: DataType.INTEGER,
    })
    productCartId!: number;

}