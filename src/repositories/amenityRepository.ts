import { ValidationError } from "sequelize";
import Amenity from "../models/Amenity.js";
import { ErrorMessage } from "../interfaces.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";

export default class amenityRepository {

    static async getAll() {

        try {

            let amenities = await Amenity.findAll({
                order: ['id'],
                raw: true
            });

            return amenities;

        } catch (err: any) {

            throw this.#buildError(err, "get all");

        }

    }

    static async insert(amenity: any) {

        try {

            return await Amenity.create(amenity);

        } catch (err: any) {

            throw this.#buildError(err, "insert");

        }

    }

    static async update(amenity: any) {

        try {

            await Amenity.update({
                ...amenity
            }, {
                where: {
                    id: amenity.id
                }
            });

            return "Amenity updated successfully";

        } catch (err: any) {

            throw this.#buildError(err, "update");

        }

    }

    static async delete(id: any) {

        try {

            await Amenity.destroy({
                where: { id }
            });

            return "Amenity deleted successfully";

        } catch (err: any) {

            throw this.#buildError(err, "delete");

        }

    }

    static #buildError(err:any, operation:string) {

        if (err instanceof ValidationError) {

            const messages = err.errors.map(err => err.message);

            let error: ErrorMessage = {
                status: httpStatusEnum.INTERNAL_ERROR,
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