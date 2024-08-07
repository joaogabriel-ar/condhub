import { ValidationError } from "sequelize";
import User from "../models/User.js";
import { ErrorMessage } from "../interfaces.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";

export default class userRepository {

    static async getAll() {

        try {

            let users = await User.findAll({
                order: ['id'],
                raw: true
            });

            return users;

        } catch (err: any) {

            throw this.#buildError(err, "get all");

        }

    }

    static async insert(user: any) {

        try {

            return await User.create(user);

        } catch (err: any) {

            throw this.#buildError(err, "insert");

        }

    }

    static async update(user: any) {

        try {

            await User.update({
                ...user
            }, {
                where: {
                    id: user.id
                }
            });

            return "User updated successfully";

        } catch (err: any) {

            throw this.#buildError(err, "update");

        }

    }

    static async delete(id: any) {

        try {

            await User.destroy({
                where: { id }
            });

            return "User deleted successfully";

        } catch (err: any) {

            throw this.#buildError(err, "delete");

        }

    }

    static #buildError(err:any, operation:string) {        

        if (err instanceof ValidationError) {            

            const messages = err.errors.map(err => err.message);

            let error: ErrorMessage = {
                status: httpStatusEnum.BAD_REQUEST,
                messages: messages
            }

            return error;

        }

        let error: ErrorMessage = {
            status: httpStatusEnum.INTERNAL_ERROR,
            messages: `Error to ${operation} data`
        }

        return error;

    }

}