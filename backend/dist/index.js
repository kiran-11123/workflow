import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import logger from "./utils/logger.setup.js";
import { log } from "node:console";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
    logger.info(`Workflow Backend Server is healthy`);
    res.status(200).json({
        message: 'Workflow Backend server is healthy'
    });
});
app.listen(PORT, () => {
    logger.info(`WorkFlow Server is running on PORT ${PORT}`);
});
//# sourceMappingURL=index.js.map