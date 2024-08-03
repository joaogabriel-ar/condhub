import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../env.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { RolesEnum } from "../enums/rolesEnum.js";
import { CheckedUser } from "../interfaces.js";
export default class auth {

    static async authenticate(req: Request, res: Response, next: NextFunction) {

        const token = req.headers['authorization'];

        if (!token) {

            return res.status(403).json("No token provided");
        }

        jwt.verify(token, SECRET_KEY, (error: any, decoded: any) => {

            if (error) {

                return res.status(403).json({
                    error: "Failed to authenticate token"
                });
            }

            (req as any).userId = decoded.id

            next();
        });

    }

    static async checkIsAdmin(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (req as any).userId;

            let checkedUser: CheckedUser = await auth.checkUser(userId, [RolesEnum.ADMIN]);

            if (!checkedUser.allowed) {

                return res.status(403).json(checkedUser);

            }

            next();

        } catch (err: any) {

            return res.status(500).json({
                status: "failed",
                error: 'Internal Server Error'
            });

        }
    }

    static async checkIsSyndic(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (req as any).userId;

            let checkedUser: CheckedUser = await auth.checkUser(userId, [RolesEnum.ADMIN, RolesEnum.SYNDIC]);

            if (!checkedUser.allowed) {

                return res.status(403).json(checkedUser);

            }

            next();

        } catch (err: any) {

            return res.status(500).json({
                status: "failed",
                error: 'Internal Server Error'
            });

        }
    }

    
    static async checkIsResident(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (req as any).userId;

            let checkedUser: CheckedUser = await auth.checkUser(userId, [RolesEnum.ADMIN, RolesEnum.SYNDIC, RolesEnum.RESIDENT]);

            if (!checkedUser.allowed) {

                return res.status(403).json(checkedUser);

            }

            next();

        } catch (err: any) {

            return res.status(500).json({
                status: "failed",
                error: 'Internal Server Error'
            });

        }
    }

    static async checkUser(userId: number, roles: number[]) {

        let user = await User.findOne({
            where: {
                id: userId
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

        if (!roles.includes(role_id)) {

            return {
                status: "failed",
                error: "Forbidden",
                allowed: false
            };

        }

        return {
            allowed: true
        }
    }

} 
