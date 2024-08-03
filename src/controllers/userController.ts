import { NextFunction, Request, Response } from "express";
import userService from "../services/userService.js";
import { ErrorMessage } from "../interfaces.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";

export default class userController {

    static async getAll(req: Request, res: Response) {

        try {

            return res.status(httpStatusEnum.OK).send(await userService.getAll());

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

    static async insert(req: Request, res: Response) {

        try {

            let user = req.body;

            if (!user.name || !user.email || !user.password || !user.phone || !user.role_id || !user.hasOwnProperty("active")) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;

            }

            return res.status(httpStatusEnum.OK).send(await userService.insert(user));

        } catch (err: any) {

            return res.status(err.status).json(err);

        }


    }

    static async update(req: Request, res: Response) {

        try {

            let user = req.body;

            if (!user.id || !user.name || !user.email || !user.phone || !user.role_id || !user.hasOwnProperty("active")) {

                let err:ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;

            }

            return res.status(httpStatusEnum.OK).send(await userService.update(user));

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

    static async delete(req: Request, res: Response) {

        try {

            let { id } = req.params;

            if (!id) {

                let err:ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;
            }

            return res.status(httpStatusEnum.OK).send(await userService.delete(id));

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

}