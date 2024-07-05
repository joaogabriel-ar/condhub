import { Sequelize } from "sequelize";
import { database, username, password, host, port, dialect } from "../env.js";

class Database {

    private connection: Sequelize = new Sequelize(
        database,
        username,
        password,
        {
            host,
            port,
            dialect
        }
    );

    /**
     * Test database connection
     */
    async tryDatabaseConnection() {

        try {

            await this.connection.authenticate();

        } catch (err: any) {

            throw new Error(err.message);

        }

    }

    /**
     * Returns sequelize connection options
     * @returns 
     */
    getDatabaseConnection() {

        return this.connection;

    }
}

export default Database;