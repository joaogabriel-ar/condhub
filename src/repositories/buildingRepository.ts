import { ValidationError } from "sequelize";
import Building from "../models/Building.js";
import { ErrorMessage } from "../interfaces.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";

export default class buildingRepository {

    static async getAll() {

        try {

            let buildings = await Building.findAll({
                order: ['id'],
                raw: true
            });

            return buildings;

        } catch (err: any) {

            throw this.#buildError(err, "get all");

        }

    }

    static async insert(building: any) {        

        try {

            return await Building.create(building);

        } catch (err: any) {
            
            throw this.#buildError(err, "insert");

        }

    }
    
    static async update(building: any) {        

        try {

            await Building.update({
                ...building
            }, {
                where: {
                    id: building.id
                }
            });

            return "Building updated successfully";

        } catch (err: any) {
            
            throw this.#buildError(err, "update");

        }

    }

    static async delete(id: any) {

        try {

            await Building.destroy({
                where: { id }
            });

            return "Building deleted successfully";

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