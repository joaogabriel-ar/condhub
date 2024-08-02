import { NextFunction, Request, Response } from "express";
import apartmentService from "../services/apartmentService.js";

export default class apartmentController {

    static async insert(req: Request, res: Response, next: NextFunction) {

        try {            

            let apartment = req.body;

            if (!apartment.number || !apartment.building_id || !apartment.user_id) {

                return res.status(400).send("Error. Missing information");

            }

            res.status(200).send(await apartmentService.insert(apartment));

        } catch (err:any) {          

            return res.status(500).json({
                status: "failed",
                error: 'Internal Server Error',
                valid: err
            });

        }

    }
}