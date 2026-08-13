import mongoose from "mongoose";
import logger from "../utils/log.configuration.js";

export class MongooseConnection{
     private static connection : typeof mongoose | null = null;

     private constructor(){}

          public static async getConnection(url  : string): Promise<typeof mongoose>{

            if(this.connection!=null) {
                return this.connection
            }

            this.connection = await mongoose.connect(url)
         logger.info(`MongoDB is connected`)
        return this.connection;
          
          }
}


async function ConnectDB(){

    try{

        const MONGO_URL = process.env.MONGO_URL;

        if(!MONGO_URL) {
            throw new Error(`MONGO URL is undefined`)
        }

        await MongooseConnection.getConnection(MONGO_URL);

    }
    catch(er){
         logger.info(`Getting error while connection to mongoose ${er}`)
    }
      
} 

export default ConnectDB;
