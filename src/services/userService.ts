import userRepository from "../repositories/userRepository.js";

export default class userService {

    static async getAll() {

        return await userRepository.getAll();

    }

    static async insert(user: any) {

        return await userRepository.insert(user);

    }

    static async update(id: any) {

        return await userRepository.delete(id);

    }

    static async delete(id: any) {

        return await userRepository.delete(id);

    }

}