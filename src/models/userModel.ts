import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { RoleModel } from './roleModel';
import { CartModel } from './cartModel';
import { OrderModel } from './orderModel';

@Table({
    tableName: "users",
    timestamps: true
})

export  class UserModel extends Model<UserModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

    @ForeignKey(() => RoleModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleId!: number;

    @ForeignKey(() => CartModel)
    @Column({
        type: DataType.INTEGER,
    })
    cartId!: number;

    @BelongsTo(() => CartModel)
    cart!: CartModel

    @HasMany(() => OrderModel)
    orders!: OrderModel[]

}