import { NextFunction, Request, Response } from "express";
import amenityService from "../services/amenityService.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import { ErrorMessage } from "../interfaces.js";

export default class amenityController {

    static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            return res.status(httpStatusEnum.OK).send(await amenityService.getAll());

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

    static async insert(req: Request, res: Response, next: NextFunction) {

        try {

            let amenity = req.body;

            if (!amenity.name || !amenity.building_id || !amenity.description || !amenity.availability_status) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;

            }

            res.status(httpStatusEnum.OK).send(await amenityService.insert(amenity));

        } catch (err: any) {            

            return res.status(err.status).json(err);

        }

    }

    static async update(req: Request, res: Response, next: NextFunction) {

        try {

            let amenity = req.body;

            if (!amenity.id || !amenity.name || !amenity.building_id || !amenity.description || !amenity.availability_status) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;

            }

            res.status(httpStatusEnum.OK).send(await amenityService.update(amenity));

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

            res.status(httpStatusEnum.OK).send(await amenityService.delete(id));

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

}