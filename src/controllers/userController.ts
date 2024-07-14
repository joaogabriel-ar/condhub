import { NextFunction, Request, Response } from "express";
import userService from "../services/userService.js";

export default class userController {

    static async getAll(req: Request, res: Response, next: NextFunction) {

        res.status(200).send(await userService.getAll());

    }

    static async insert(req: Request, res: Response, next: NextFunction) {

        let user = req.body;

        if (!user.name || !user.email || !user.password || !user.phone || !user.role_id || !user.hasOwnProperty("active")) {

            res.status(400).send("Error. Missing information");

        }
        
        res.status(200).send(await userService.insert(user));

    }

    static async update(req: Request, res: Response, next: NextFunction) {

        let user = req.body;

        if (!user.id || !user.name || !user.email || !user.phone || !user.role_id || !user.hasOwnProperty("active")) {

            return res.status(400).send("Error, missing information.")

        }

        res.status(200).send(await userService.update(user));

    }

    static async delete(req: Request, res: Response, next: NextFunction) {

        let { id } = req.params;

        if (!id) {
            return res.status(400).send("Error, missing information.")
        }

        res.status(200).send(await userService.delete(id));

    }

}