import { DataTypes, Model } from "sequelize";
import Database from "../database/sequelize.js";
import Role from "./Role.js";
import bcrypt from "bcryptjs";

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
    password: {
        type:DataTypes.STRING(100),
        allowNull:false,
        validate: {
            notEmpty: true,
            notNull: true,
            len:[1,100]
        },
        
        set(password:any) {
            
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            this.setDataValue('password', hash);
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
            invalidNumber(role:number) {
                if(role > 4 || role < 1) {
                    throw new Error("Invalid role value");
                }

            }
        }
    }

},{
    sequelize,
    modelName: "users",
    createdAt: false,
    updatedAt: false
});