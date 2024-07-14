import { NextFunction, Request, Response } from "express";
import authService from "../services/authService.js";

export default class authController {

    static async login(req: Request, res: Response, next: NextFunction) {

        try {

            const { email, password } = req.body;

            if (!email || !password) {

                res.status(404).json({
                    status: "failed",
                    error: "Missing credentials"
                });

            }

            let auth = await authService.login({ email, password });

            if (!auth) {

                return res.status(403).json({
                    status: "failed",
                    error: "Invalid Credentials"
                });
            }

            return res.status(200).json(auth);

        } catch (err: any) {

            return res.status(500).json({
                status: "failed",
                error: 'Internal Server Error'
            });

        }

    }

    static async verifyToken(req: Request, res: Response, next: NextFunction) {

        const { token } = req.body;

        if (!token) {

            res.status(404).json({
                status: "failed",
                error: 'Missing token',
            });
        }

        try {

            let isValid = await authService.verifyToken({token});

            if (!isValid) {

                res.status(403).json({
                    status: 'failed',
                    error: 'Token is invalid'
                });

            }

            res.status(200).json({
                status: 'success',
                valid: true,
                token
            });

        } catch (err) {

            return res.status(500).json({
                status: "failed",
                error: 'Internal Server Error',
                valid: err
            });

        }

    }

}