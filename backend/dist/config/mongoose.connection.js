import mongoose from "mongoose";
import logger from "../utils/logger.setup.js";
import dotenv from 'dotenv';
dotenv.config();
export class MongooseConnection {
    static connection = null;
    constructor() { }
    static async getConnection(url) {
        if (this.connection) {
            logger.info(`MongoDB is connected`);
            return this.connection;
        }
        this.connection = await mongoose.connect(url);
        logger.info(`MongoDB is connected`);
        return this.connection;
    }
}
async function ConnectDB() {
    try {
        const MONGO_URL = process.env.MONGO_URL;
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        await MongooseConnection.getConnection(MONGO_URL);
    }
    catch (er) {
        logger.info(`Getting error while connection to mongoose ${er}`);
    }
}
export default ConnectDB;
//# sourceMappingURL=mongoose.connection.js.map