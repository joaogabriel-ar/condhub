import { NextFunction, Request, Response } from "express";
import userService from "../services/userService.js";

export default class userController {

    static getAll(req: Request, res: Response, next: NextFunction) {

        res.send(userService.getAll());
    }

    static insert(req: Request, res: Response, next: NextFunction) {
        
        let user = req.body;

        if(!user.name || !user.email || !user.phone || !user.role_id || !user.active) {

            res.send("Erro, falha em alguma info.");

        }

        res.send(userService.insert(user));
    }

}