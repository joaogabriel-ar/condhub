import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";
import User from "./User.js";
import Building from "./Building.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class Apartment extends Model { };

Apartment.init({
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1, 255],
        }
    },
    building_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Building,
            key: "id",

        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",

        }
    }

}, {
    sequelize,
    modelName: "apartments",
    createdAt: false,
    updatedAt: false
});