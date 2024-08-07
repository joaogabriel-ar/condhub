import { ValidationError } from "sequelize";
import Apartment from "../models/Apartment.js";
import { ErrorMessage } from "../interfaces.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";

export default class apartmentRepository {

    static async getAll() {

        try {

            let apartments = await Apartment.findAll({
                order: ['id'],
                raw: true
            });

            return apartments;

        } catch (err: any) {

            throw this.#buildError(err, "get all");

        }

    }

    static async insert(aparment: any) {        

        try {

            return await Apartment.create(aparment);

        } catch (err: any) {
            
            throw this.#buildError(err, "insert");

        }

    }

    static async update(apartment: any) {        

        try {

            await Apartment.update({
                ...apartment
            }, {
                where: {
                    id: apartment.id
                }
            });

            return "Apartment updated successfully";

        } catch (err: any) {
            
            throw this.#buildError(err, "update");

        }

    }

    static async delete(id: any) {

        try {

            await Apartment.destroy({
                where: { id }
            });

            return "Apartment deleted successfully";

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