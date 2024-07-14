import { Credentials, Token } from "../interfaces";
import authRepository from "../repositories/authRepository.js";

export default class authService {

    static async login(credentials: Credentials) {

        return await authRepository.login(credentials);
    }

    static async verifyToken(token: Token) {
        return await authRepository.verifyToken(token);

    }

}