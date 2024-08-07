import { ValidationError } from "sequelize";
import AmenityReservation from "../models/AmenityReservation.js";
import { ErrorMessage } from "../interfaces.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import { reservationStatusEnum } from "../enums/reservationStatusEnum.js";

export default class amenityReservationRepository {

    static async getAll() {

        try {

            let amenities = await AmenityReservation.findAll({
                order: ['id'],
                raw: true
            });

            return amenities;

        } catch (err: any) {

            throw this.#buildError(err, "get all");

        }

    }

    static async insert(amenityReservation: any) {

        try {

            amenityReservation.reservation_status = reservationStatusEnum.PENDING;

            return await AmenityReservation.create(amenityReservation);

        } catch (err: any) {

            throw this.#buildError(err, "insert");

        }

    }

    static async update(amenityReservation: any) {

        try {

            await AmenityReservation.update({
                ...amenityReservation
            }, {
                where: {
                    id: amenityReservation.id
                }
            });

            return "AmenityReservation updated successfully";

        } catch (err: any) {

            throw this.#buildError(err, "update");

        }

    }

    static async delete(id: any) {

        try {

            await AmenityReservation.destroy({
                where: { id }
            });

            return "Amenity Reservation deleted successfully";

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