import { NextFunction, Request, Response } from "express";
import buildingService from '../services/buildingService.js';

export default class buildingController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        
       return res.status(200).send(await buildingService.getAll());

    }

    static async insert(req: Request, res: Response, next: NextFunction) {

        try {            

            let building = req.body;

            if (!building.name || !building.address || !building.cnpj || !building.syndic_id) {

               return res.status(400).send("Error. Missing information");

            }

            res.status(200).send(await buildingService.insert(building));

        } catch (err:any) {          

            return res.status(500).json({
                status: "failed",
                error: 'Internal Server Error',
                valid: err
            });

        }

    }

    static async update(req: Request, res: Response, next: NextFunction) {

        try {

            let building = req.body;            

            if (!building.name || !building.address || !building.cnpj || !building.syndic_id) {

               return res.status(400).send("Error. Missing information");

            }

            res.status(200).send(await buildingService.update(building));

        } catch (err:any) {          

            return res.status(500).json({
                status: "failed",
                error: 'Internal Server Error',
                valid: err
            });

        }

    }

    static async delete(req: Request, res: Response, next: NextFunction) {

        let { id } = req.params;

        if (!id) {

            return res.status(400).send("Error, missing information.")
        }

        res.status(200).send(await buildingService.delete(id));

    }

}