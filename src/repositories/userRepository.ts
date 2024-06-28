import User from "../models/User.js";

export default class userRepository {

    static async getAll() {

        let users = await User.findAll({
            raw: true
        });
        
        return users;

    }

    static async insert(user:any) {        

        try {

            return await User.create(user);
            
        } catch (error:any) {
            console.log(error.message);
            
        }

    }

    static async update(user:any) {

        try {

            // return await User.find

        } catch (err) {

        }

    }

    static async delete(id:any) {        

        try {

            await User.destroy({
                where: {id}
            });

            return "Deletado com sucesso !"
            
        } catch (error:any) {

            console.log(error.message);
            
        }

    }

}