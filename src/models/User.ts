import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";
import Role from "./Role.js";

const database = new Database();
const sequelize = database.getDatabaseConnection();

export default class User extends Model{};

User.init({
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len:[1,50],
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len:[1,100],
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1,20],
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,

        }
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
            
        },
        validate: {
            len: [1,4],
        }
    }

},{
    sequelize,
    modelName: "users",
    createdAt: false,
    updatedAt: false
});