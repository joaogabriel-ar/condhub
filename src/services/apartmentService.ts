import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import { RolesEnum } from "../enums/rolesEnum.js";
import { ErrorMessage } from "../interfaces.js";
import Apartment from "../models/Apartment.js";
import Building from "../models/Building.js";
import User from "../models/User.js";
import apartmentRepository from "../repositories/apartmentRepository.js";

export default class apartmentService {

    static async getAll() {

        return await apartmentRepository.getAll();

    }

    static async insert(apartment: any) {

        try {

            let validation = await this.#validation(apartment);

            if (!validation.length) {

                return await apartmentRepository.insert(apartment);

            }

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: validation
            }


        } catch (err: any) {

            throw err;
        }

    }

    static async update(apartment: any) {

        try {

            let validation = await this.#validation(apartment, true);

            if (!validation.length) {

                return await apartmentRepository.update(apartment);

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

        let apartment = await Apartment.findOne({
            where: {
                id
            }
        });

        if (!apartment) {

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: "Apartment not found"
            }

        }

        return await apartmentRepository.delete(id);

    }

    static async #validation(apartment: any, isUpdate: boolean = false) {

        let messages = [];

        if (isUpdate) {

            let apartmentExists = await this.#apartmentExists(apartment.id);

            if (!apartmentExists) {

                messages.push("Apartment not found");

            }
        }

        let buildingExists = await this.#buildingExists(apartment.building_id);

        if (!buildingExists) {

            messages.push("Building not found");

        }

        let user = await this.#userExists(apartment.user_id);

        if (!user) {

            messages.push("User not found");

            return messages;
        }

        let isAllowed = this.#userIsAllowed(user.role_id);

        if (!isAllowed) {

            messages.push("User is not allowed");

        }

        return messages;

    }

    static async #apartmentExists(id: any) {

        let apartment = await Apartment.findOne({
            where: {
                id
            }
        });

        if (!apartment) {
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

    static async #userExists(userId: any): Promise<any | null> {

        let user = await User.findOne({
            where: {
                id: userId
            }
        });

        return user;

    }

    static #userIsAllowed(roleId: any): boolean {

        if (![RolesEnum.ADMIN, RolesEnum.RESIDENT, RolesEnum.SYNDIC].includes(roleId)) {

            return false;

        }

        return true

    }

}