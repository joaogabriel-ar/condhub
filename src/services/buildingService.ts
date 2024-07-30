import buildingRepository from "../repositories/buildingRepository.js";

export default class userService {


    static async insert(user: any) {

        return await buildingRepository.insert(user);

    }

}