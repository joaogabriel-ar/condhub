import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class Role extends Model{};

Role.init({
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1,4]
        }
    }
}, {
    sequelize,
    modelName: "roles"
});