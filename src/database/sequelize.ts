import { Sequelize } from "sequelize";

class Database {

    private connection:Sequelize = new Sequelize({
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
    async tryDatabaseConnection() {
    
        try {
    
            await this.connection.authenticate();
        
        } catch (err:any) {
        
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