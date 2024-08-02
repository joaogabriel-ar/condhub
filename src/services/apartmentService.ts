import { RolesEnum } from "../enums/rolesEnum.js";
import User from "../models/User.js";
import apartmentRepository from "../repositories/apartmentRepository.js";

export default class apartmentService {

    #allowedRoles = [RolesEnum.ADMIN, RolesEnum.RESIDENT, RolesEnum.SYNDIC]

    static async insert(apartment: any) {

        let user = await User.findOne({
            where: {
                id: apartment.user_id
            }
        });

        if (!user) {

            return {
                status: "failed",
                error: 'User not found',
                allowed: false
            };
        }

        let { role_id } = user.dataValues;

        if (![RolesEnum.ADMIN, RolesEnum.RESIDENT, RolesEnum.SYNDIC].includes(role_id)) {

            return {
                status: "failed",
                error: "Forbidden",
                allowed: false
            };

        }

        return await apartmentRepository.insert(apartment);

    }

}