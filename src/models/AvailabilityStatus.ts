import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class AvailabilityStatus extends Model{};

AvailabilityStatus.init({
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1,20],
        }
    }
}, {
    sequelize,
    modelName: "availability_status",
    createdAt: false,
    updatedAt: false
});