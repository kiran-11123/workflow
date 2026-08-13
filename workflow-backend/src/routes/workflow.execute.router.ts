import express from 'express'
const execute_router = express.Router();
import { WorkFlowExecutorController } from '../controllers/workflow.execute.controller.js';
const controller = new WorkFlowExecutorController();

// Execute signup workflow
execute_router.post('/signup', controller.signup_workflow_execute.bind(controller))

export default execute_router;