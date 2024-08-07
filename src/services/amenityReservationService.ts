import amenityReservationRepository from "../repositories/amenityReservationRepository.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import Amenity from "../models/Amenity.js";
import AmenityReservation from "../models/AmenityReservation.js";

export default class amenityReservationService {

    static async getAll() {

        return await amenityReservationRepository.getAll();

    }

    static async insert(amenityReservation: any) {

        try {

            let validation = await this.#validation(amenityReservation);            

            if (!validation.length) {

                return await amenityReservationRepository.insert(amenityReservation);

            }

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: validation
            }

        } catch (err: any) {

            throw err;
        }

    }

    static async update(amenityReservation: any) {

        try {

            let validation = await this.#validation(amenityReservation, true);

            if (!validation.length) {

                return await amenityReservationRepository.update(amenityReservation);

            }

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: validation
            }

        } catch (err: any) {

            throw err;
        }

    }

    static async delete(id: any) {

        let amenityReservation = await AmenityReservation.findOne({
            where: {
                id
            }
        });

        if(!amenityReservation) {

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: "Amenity reservation not found"
            }

        }

        return await amenityReservationRepository.delete(id);

    }

    static async #validation({ id }: any, isUpdate: boolean = false) {

        let messages = [];

        if (isUpdate) {

            let amenityReservationExists = await this.#amenityExists(id);

            if (!amenityReservationExists) {

                messages.push("Amenity not found");
            }
        }

        return messages;

    }

    static async #amenityExists(id: number) {        

        let amenity = await Amenity.findOne({
            where: {
                id
            }
        });

        if (!amenity) {
            return false;
        }

        return true;

    }

}