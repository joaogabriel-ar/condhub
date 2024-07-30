import { NextFunction, Request, Response } from "express";
import buildingService from '../services/buildingService.js';

export default class userController {

    static async insert(req: Request, res: Response, next: NextFunction) {

        let building = req.body;

        if (!building.name || !building.address || !building.cnpj || !building.syndic_id) {

            res.status(400).send("Error. Missing information");

        }
        
        res.status(200).send(await buildingService.insert(building));

    }

}