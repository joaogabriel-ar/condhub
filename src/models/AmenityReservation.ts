import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";
import AvailabilityStatus from "./AvailabilityStatus.js";
import ReservationStatus from "./ReservationStatus.js";
import Amenity from "./Amenity.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class AmenityReservation extends Model { };

AmenityReservation.init({
    amenity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Amenity,
            key: "id",
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1, 255],
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    reservation_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }

}, {
    sequelize,
    modelName: "amenity_reservations",
    createdAt: false,
    updatedAt: false
});