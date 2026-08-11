import express from 'express'
const execute_router = express.Router();
import { WorkFlowExecutorController } from '../controllers/workflow.execute.controller.js';
const controller = new WorkFlowExecutorController();


execute_router.post('/:id' , controller.execute.bind(controller))



export default execute_router;