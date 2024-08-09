import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import { UserModel } from './userModel';
import { PermissionModel } from './permissionModel';

@Table({
    tableName: "roles",
    timestamps: true
})

export  class RoleModel extends Model<RoleModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @UpdatedAt
    @Column({
        type: DataType.DATE
    })
    updatedAt!: Date

    @CreatedAt
    @Column({
        type: DataType.DATE
    })
    createdAt!: Date

    @HasMany(() => UserModel)
    users!: UserModel[];

    @HasMany(() => PermissionModel)
    permissions!: PermissionModel[];
}