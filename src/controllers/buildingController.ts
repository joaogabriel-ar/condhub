import { NextFunction, Request, Response } from "express";
import buildingService from '../services/buildingService.js';
import { ErrorMessage } from "../interfaces.js";
import { httpStatusEnum } from "../enums/httpStatusEnum.js";

export default class buildingController {

    static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            return res.status(200).send(await buildingService.getAll());

        } catch (err:any) {

            return res.status(err.status).json(err);

        }
        

    }

    static async insert(req: Request, res: Response, next: NextFunction) {

        try {            

            let building = req.body;

            if (!building.name || !building.address || !building.cnpj || !building.syndic_id) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;

            }

            res.status(httpStatusEnum.OK).send(await buildingService.insert(building));

        } catch (err:any) {          

            return res.status(err.status).json(err);

        }

    }

    static async update(req: Request, res: Response, next: NextFunction) {

        try {

            let building = req.body;            

            if (!building.id || !building.name || !building.address || !building.cnpj || !building.syndic_id) {

                let err: ErrorMessage = {
                    status: httpStatusEnum.BAD_REQUEST,
                    messages: "Missing Information"
                }

                throw err;
            }

            res.status(httpStatusEnum.OK).send(await buildingService.update(building));

        } catch (err:any) {          

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
    
            return res.status(httpStatusEnum.OK).send(await buildingService.delete(id));

        } catch (err:any) {

            return res.status(err.status).json(err);

        }


    }

}