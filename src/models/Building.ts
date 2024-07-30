import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";
import User from "./User.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class Building extends Model { };

Building.init({
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1, 50],
        }
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1, 255],
        }
    },
    cnpj: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1, 100]
        }
    },
    syndic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",

        }
    }

}, {
    sequelize,
    modelName: "buildings",
    createdAt: false,
    updatedAt: false
});