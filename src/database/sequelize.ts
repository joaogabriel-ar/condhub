import { Sequelize } from "sequelize";

const connection:Sequelize = new Sequelize({

    database: "conhub",
    username: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});

/**
 * Test database connection
 */
export async function tryConnection() {

    try {

        await connection.authenticate();
    
    } catch (err:any) {
    
        throw new Error(err.message);
    
    }

}

export default {
    tryConnection
};