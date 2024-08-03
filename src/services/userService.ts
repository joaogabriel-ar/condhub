import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import User from "../models/User.js";
import userRepository from "../repositories/userRepository.js";

export default class userService {

    static async getAll() {

        return await userRepository.getAll();

    }

    static async insert(user: any) {

        return await userRepository.insert(user);

    }

    static async update(id: any) {

        return await userRepository.update(id);

    }

    static async delete(id: any) {

        let user = await User.findOne({
            where: {
                id
            }
        });        

        if (!user) {            

            throw {
                status: httpStatusEnum.NOT_FOUND,
                messages: "User not found"
            }

        }

        return await userRepository.delete(id);

    }

}