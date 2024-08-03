import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import { RolesEnum } from "../enums/rolesEnum.js";
import Building from "../models/Building.js";
import User from "../models/User.js";
import buildingRepository from "../repositories/buildingRepository.js";
export default class buildingService {

    static async getAll() {

        return await buildingRepository.getAll();

    }

    static async insert(building: any) {

        try {

            let validation = await this.#validation(building);

            if(!validation.length) {

                return await buildingRepository.insert(building);
            }

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: validation
            }

        } catch (err: any) {

            throw err;
        }

    }

    static async update(building: any) {

        try {

            let validation = await this.#validation(building);

            if(!validation.length) {

                return await buildingRepository.update(building);
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

        let building = await Building.findOne({
            where: {
                id
            }
        });        

        if (!building) {            

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: "Building not found"
            }

        }

        return await buildingRepository.delete(id);

    }

    static async #validation(building:any) {

        let messages = [];

        let syndic = await this.#syndicExists(building.syndic_id);

        if(!syndic) {

            messages.push("Syndic not found");

            return messages;
        }

        let isSyndic = await this.#isSyndic(syndic.role_id);

        if(!isSyndic) {

            messages.push("User is not a syndic");

        }

        return messages;

    }

    static async #syndicExists(syndicId:any) {        

        let user = await User.findOne({
            where: {
                id: syndicId
            }
        });

        if (!user) {

            return false;

        }
        
        return user.dataValues;

    }

    static async #isSyndic(roleId:number) {
        
        if (roleId !== RolesEnum.SYNDIC && roleId !== RolesEnum.ADMIN) {

            return false;
        }

        return true;

    }

}