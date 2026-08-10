import express from 'express';
const execute_router = express.Router();
import { WorkFlowExecutorController } from '../controllers/workflow.execute.controller.js';
const controller = new WorkFlowExecutorController();
execute_router.post('/:id', controller.execute);
export default execute_router;
//# sourceMappingURL=workflow.execute.router.js.map