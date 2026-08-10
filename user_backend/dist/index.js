import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import ConnectDB from './config/mongoose.connect.js';
import RunLogRetentionJob from './utils/log.retention.js';
import logger from './utils/logger.setup.js';
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
await ConnectDB();
await RunLogRetentionJob();
app.listen(PORT, () => {
    logger.info(`Users backend server is running in PORT ${PORT}`);
});
//# sourceMappingURL=index.js.map