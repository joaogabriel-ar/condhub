import { ValidationError } from "sequelize";
import Apartment from "../models/Apartment.js";

export default class apartmentRepository {

    static async insert(aparment: any) {        

        try {

            return await Apartment.create(aparment);

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