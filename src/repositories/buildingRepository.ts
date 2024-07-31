import { ValidationError } from "sequelize";
import Building from "../models/Building.js";

export default class buildingRepository {

    static async getAll() {

        try {

            let users = await Building.findAll({
                raw: true
            });

            return users;

        } catch (err: any) {

            if (err instanceof ValidationError) {

                const messages = err.errors.map(err => err.message);

                return messages;

            } else {

                return err.message;
            }

        }

    }

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
    
    static async update(building: any) {        

        try {

            await Building.update({
                ...building
            }, {
                where: {
                    id: building.id
                }
            });

            return "Bulding updated successfully";

        } catch (err: any) {
            
            if (err instanceof ValidationError) {
                
                const messages = err.errors.map(err => err.message);

                return messages;

            } else {

                return err.message;
            }

        }

    }

    static async delete(id: any) {

        try {

            await Building.destroy({
                where: { id }
            });

            return "Building deleted successfully";

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