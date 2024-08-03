import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";
import Building from "./Building.js";
import AvailabilityStatus from "./AvailabilityStatus.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class Amenity extends Model { };

Amenity.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1, 50],
        }
    },
    building_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Building,
            key: "id",
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1, 255],
        }
    },
    availability_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: AvailabilityStatus,
            key: "id",

        },
        validate: {
            len: [1, 5],
            invalidNumber(role: number) {
                if (role > 5 || role < 1) {
                    throw new Error("Invalid role value");
                }
            }
        }
    }

}, {
    sequelize,
    modelName: "amenities",
    createdAt: false,
    updatedAt: false
});