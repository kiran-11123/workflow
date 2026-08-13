import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import ConnectDB from './config/mongoose.connection.js';
import logger from './utils/log.configuration.js';
import product_router from './routes/products.routes.js';
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
await ConnectDB();
app.use('/app/products', product_router);
app.listen(PORT, () => {
    logger.info(`orders backend is running on PORT ${PORT}`);
});
//# sourceMappingURL=index.js.map