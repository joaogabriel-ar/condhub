import { NextFunction, Request, Response } from "express";
import authService from "../services/authService.js";

export default class authController {

    static async login(req: Request, res: Response, next: NextFunction) {

        try {

            const { email, password } = req.body;

            if (!email || !password) {

                res.status(404).send("Missing credentials");

            }

            let auth = await authService.login({ email, password });

            if (!auth) {

                return res.status(403).json({
                    status: "failed",
                    error: "Invalid Credentials"
                });
            }

            return res.status(200).send(auth);

        } catch (err: any) {

            return res.status(500).json({ error: 'Internal Server Error' });

        }

    }



}