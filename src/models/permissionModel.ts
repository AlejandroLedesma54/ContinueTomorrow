import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey
} from 'sequelize-typescript';
import { RoleModel } from './roleModel';
import { EntityModel } from './entitiesModel';

@Table({
    tableName: "permissions",
    timestamps: true
})

export class PermissionModel extends Model<PermissionModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(() => RoleModel)
    @Column({
        type: DataType.INTEGER,
    })
    roleId!: number;

    @ForeignKey(() => EntityModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    entityId!: number;

    @Column({
        type: DataType.BOOLEAN,
    })
    canCreate!: boolean;

    @Column({
        type: DataType.BOOLEAN,
    })
    canUpdate!: boolean;

    @Column({
        type: DataType.BOOLEAN
    })
    canDelete!: boolean;

    @Column({
        type: DataType.BOOLEAN,
    })
    canGet!: boolean;
}