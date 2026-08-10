import mongoose from "mongoose";
export declare class MongooseConnection {
    private static connection;
    private constructor();
    static getConnection(url: string): Promise<typeof mongoose>;
}
declare function ConnectDB(): Promise<void>;
export default ConnectDB;
//# sourceMappingURL=mongoose.connect.d.ts.map