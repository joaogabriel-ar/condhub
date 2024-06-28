import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";
import Role from "./Role.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class User extends Model{};

User.init({
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: "id",
            
        }
    }

},{
    sequelize,
    modelName: "users",
    createdAt: false,
    updatedAt: false
});