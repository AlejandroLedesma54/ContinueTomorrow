import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany
} from 'sequelize-typescript';
import { ProductCart } from './productCartModel';

@Table({
    tableName: "products",
    timestamps: true
})

export  class ProductModel extends Model<ProductModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @Column({
        type: DataType.DECIMAL
    })
    price!: number;
    
    @Column({
        type: DataType.STRING
    })
    description!: string;

    @Column({
        type: DataType.INTEGER
    })
    stock!: number;

    @HasMany(() => ProductCart)
    users!: ProductCart[];

}