import { ValidationError } from "sequelize";
import User from "../models/User.js";

export default class userRepository {

    static async getAll() {

        try {

            let users = await User.findAll({
                raw: true
            });

            return users;

        } catch (err: any) {

            if (err instanceof ValidationError) {

                const messages = err.errors.map(err => err.message);

                return messages;

            } else {

                return err.message;
            }

        }

    }

    static async insert(user: any) {

        try {

            return await User.create(user);

        } catch (err: any) {
            

            if (err instanceof ValidationError) {

                const messages = err.errors.map(err => err.message);

                return messages;

            } else {

                return err.message;
            }

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

            if (err instanceof ValidationError) {

                const messages = err.errors.map(err => err.message);

                return messages;

            } else {

                return err.message;
            }

        }

    }

    static async delete(id: any) {

        try {

            await User.destroy({
                where: { id }
            });

            return "User deleted successfully";

        } catch (err: any) {

            if (err instanceof ValidationError) {

                const messages = err.errors.map(err => err.message);

                return messages;

            } else {

                return err.message;
            }

        }

    }

}