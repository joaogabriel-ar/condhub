import userRepository from "../repositories/userRepository.js";

export default class userService {

    static getAll() {

        return userRepository.getAll();

    }


    static insert(user: any) {

        return userRepository.insert(user);

    }

}