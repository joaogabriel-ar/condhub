import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class Role extends Model{};

Role.init({
    role: DataTypes.INTEGER
}, {
    sequelize,
    modelName: "roles"
});