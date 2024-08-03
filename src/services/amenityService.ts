import Building from "../models/Building.js";
import amenityRepository from "../repositories/amenityRepository.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import Amenity from "../models/Amenity.js";

export default class amenityService {

    static async getAll() {

        return await amenityRepository.getAll();

    }

    static async insert(amenity: any) {

        try {

            let validation = await this.#validation(amenity);            

            if (!validation.length) {

                return await amenityRepository.insert(amenity);

            }

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: validation
            }

        } catch (err: any) {

            throw err;
        }

    }

    static async update(amenity: any) {

        try {

            let validation = await this.#validation(amenity, true);

            if (!validation.length) {

                return await amenityRepository.update(amenity);

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

        let amenity = await Amenity.findOne({
            where: {
                id
            }
        });

        if(!amenity) {

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: "Amenity not found"
            }

        }

        return await amenityRepository.delete(id);

    }

    static async #validation({ id, building_id }: any, isUpdate: boolean = false) {

        let messages = [];

        if (isUpdate) {

            let amenityExists = await this.#amenityExists(id);

            if (!amenityExists) {

                messages.push("Amenity not found");
            }
        }

        let buildingExists: boolean = await this.#buildingExists(building_id);

        if (!buildingExists) {

            messages.push("Building not found");

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

    static async #buildingExists(building_id: number): Promise<boolean> {

        let building = await Building.findOne({
            where: {
                id: building_id
            }
        });

        if (!building) {

            return false;

        }

        return true;

    }
}