import { NextFunction, Request, Response } from "express";
import amenityReservationService from "../services/amenityReservationService.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";
import { ErrorMessage } from "../interfaces.js";

export default class amenityReservationReservationController {

    static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            return res.status(httpStatusEnum.OK).send(await amenityReservationService.getAll());

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

    static async insert(req: Request, res: Response, next: NextFunction) {

        try {

            let amenityReservation = req.body;

            console.log(amenityReservation);
            

            if (!amenityReservation.amenity_id || !amenityReservation.user_id || !amenityReservation.reservation_date) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;

            }

            res.status(httpStatusEnum.OK).send(await amenityReservationService.insert(amenityReservation));

        } catch (err: any) {            

            return res.status(err.status).json(err);

        }

    }

    static async update(req: Request, res: Response, next: NextFunction) {

        try {

            let amenityReservation = req.body;

            if (!amenityReservation.amenity_id || !amenityReservation.user_id || !amenityReservation.reservation_date) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;

            }

            res.status(httpStatusEnum.OK).send(await amenityReservationService.update(amenityReservation));

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

            res.status(httpStatusEnum.OK).send(await amenityReservationService.delete(id));

        } catch (err: any) {

            return res.status(err.status).json(err);

        }

    }

}