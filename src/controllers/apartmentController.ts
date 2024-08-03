import { NextFunction, Request, Response } from "express";
import apartmentService from "../services/apartmentService.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import { ErrorMessage } from "../interfaces.js";

export default class apartmentController {

    static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            return res.status(httpStatusEnum.OK).send(await apartmentService.getAll());

        } catch (err: any) {

            return res.status(err.status).json(err);

        }
    }

    static async insert(req: Request, res: Response, next: NextFunction) {

        try {

            let apartment = req.body;            

            if (!apartment.number || !apartment.building_id || !apartment.user_id) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;

            }

            res.status(httpStatusEnum.OK).send(await apartmentService.insert(apartment));

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

    static async update(req: Request, res: Response, next: NextFunction) {

        try {

            let apartment = req.body;

            if (!apartment.id || !apartment.number || !apartment.building_id || !apartment.user_id) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;
            }

            res.status(httpStatusEnum.OK).send(await apartmentService.update(apartment));

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

    static async delete(req: Request, res: Response, next: NextFunction) {

        try {

            let { id } = req.params;
    
            if (!id) {
    
                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }
    
                throw err;
            }
    
            return res.status(httpStatusEnum.OK).send(await apartmentService.delete(id));

        } catch (err:any) {

            return res.status(err.status).json(err);

        }
    }

}