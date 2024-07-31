import { RolesEnum } from "../enums/rolesEnum.js";
import User from "../models/User.js";
import buildingRepository from "../repositories/buildingRepository.js";
export default class buildingService {

    static async getAll() {

        return await buildingRepository.getAll();

    }

    static async insert(building: any) {

        try {

            await buildingService.validate(building);

            return await buildingRepository.insert(building);

        } catch (err: any) {

            throw err;
        }

    }

    static async update(building: any) {

        try {

           await this.validate(building);

            return await buildingRepository.update(building);

        } catch (err: any) {

            throw err;
        }

    }

    static async delete(id: any) {

        return await buildingRepository.delete(id);

    }

    static async validate(building:any) {        

        let user = await User.findOne({
            where: {
                id: building.syndic_id
            }
        });

        if (!user) {

            throw "User not found";

        }

        let { role_id } = user.dataValues;

        if (role_id !== RolesEnum.SYNDIC) {

            throw "User is not a syndic";
        }

    }

}