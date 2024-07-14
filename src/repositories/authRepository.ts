import { Credentials, Token } from "../interfaces";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../env.js";

export default class authRepository {

    static async login({ email, password }: Credentials) {

        let user: any = await User.findOne({
            raw: true,
            where: { email }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {

            return false;

        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1 day" });

        return {
            status: "success",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                profile_picture: user.profile_picture
            }
        }

    }

    static async verifyToken({ token }: Token) {

        try {

            jwt.verify(token, SECRET_KEY);
            return true;
            
        } catch(err) {
            
            throw false

        }

    }

}