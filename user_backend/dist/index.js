import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import ConnectDB from './config/mongoose.connect.js';
import RunLogRetentionJob from './utils/log.retention.js';
import logger from './utils/logger.setup.js';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import auth_router from './routes/user.auth.routes.js';
import { ConnectConsumer } from './kafka/workflow.consumer.js';
import { ConnectProducer } from './kafka/workflow.producer.js';
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
await ConnectDB();
await ConnectConsumer();
await ConnectProducer();
RunLogRetentionJob();
const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: 'Too Many requests , please try again'
    }
});
app.use(Limiter);
app.use('/api/auth', auth_router);
app.listen(PORT, () => {
    logger.info(`Users backend server is running in PORT ${PORT}`);
});
//# sourceMappingURL=index.js.map