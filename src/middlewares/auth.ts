import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../env.js";
import jwt from "jsonwebtoken";

export default class auth {

    static async authenticate(req: Request, res: Response, next: NextFunction) {

        const token = req.headers['authorization'];

        if (!token) {

            return res.send(403).json("No token provided");
        }

        jwt.verify(token, SECRET_KEY, (error: any, decoded: any) => {

            if (error) {

                return res.status(403).json({ error: "Failed to authenticate token" });
            }

            (req as any).userId = decoded.id

            next();
        });

    }
}


