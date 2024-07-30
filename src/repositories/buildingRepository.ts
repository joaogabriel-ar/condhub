import { ValidationError } from "sequelize";
import Building from "../models/Building.js";

export default class buildingRepository {

    static async insert(building: any) {        

        try {

            return await Building.create(building);

        } catch (err: any) {
            
            if (err instanceof ValidationError) {
                
                const messages = err.errors.map(err => err.message);

                return messages;

            } else {

                return err.message;
            }

        }


    }
}