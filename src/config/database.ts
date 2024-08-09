import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Dialect } from 'sequelize';
import { strUnd } from '../interfaces/typeHelpers';
import { ProductModel, RoleModel, EntityModel, CartModel, OrderModel, PermissionModel, ProductCart, UserModel}  from "../models/index"

config({path: resolve(__dirname, "../../.env")});

const dialectDB: Dialect = process.env.DB_DIALECT as Dialect;
const hostDB: strUnd = process.env.DB_HOST;
const userNameDB: strUnd = process.env.DB_USER;
const passwordDB: strUnd = process.env.DB_PASSWORD;
const nameDB: strUnd = process.env.DB_NAME;

console.log(dialectDB, hostDB, userNameDB, passwordDB, nameDB);


if(!dialectDB || !hostDB || !userNameDB || !passwordDB || !nameDB) throw new Error("There aren't all enviroment variables");

const sequelize = new Sequelize({
    dialect: dialectDB,
    host: hostDB,
    username: userNameDB,
    password: passwordDB,
    database: nameDB,
    models: [ProductModel, RoleModel, EntityModel, CartModel, OrderModel, PermissionModel, ProductCart, UserModel]
})


ProductCart.belongsToMany(CartModel, { through: ProductCart});
CartModel.belongsToMany(ProductCart, { through: ProductCart});

export default sequelize;