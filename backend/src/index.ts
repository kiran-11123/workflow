import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import logger from "./utils/logger.setup.js";
import helmet from "helmet";
import morgan from "morgan";
dotenv.config()
const PORT = process.env.PORT;
import ConnectDB from "./config/mongoose.connection.js";
import workflow_router from "./routes/workflow.routes.js";
import execute_router from "./routes/workflow.execute.router.js";
import RunLogRetentionJob from "./utils/logger.retention.js";

const app = express()
app.use(cors())
app.use(express.json())
await ConnectDB();
app.use(helmet())
app.use(morgan('dev'))
await RunLogRetentionJob();

app.use('/api/workflow' , workflow_router)
app.use('/api/workflow/execute' , execute_router)

app.get("/health" , (req,res)=>{
     logger.info(`Workflow Backend Server is healthy`)

     res.status(200).json({
        message : 'Workflow Backend server is healthy'
     })
})



app.listen(PORT, ()=>{
    logger.info(`WorkFlow Server is running on PORT ${PORT}`)
})