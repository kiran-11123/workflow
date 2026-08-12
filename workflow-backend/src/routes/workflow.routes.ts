import { WorkFlowController } from '../controllers/workflow.controller.js';
import express from 'express'

const workflow_router = express.Router()

const controller = new WorkFlowController();


workflow_router.post('/create' , controller.create.bind(controller));
workflow_router.get('/' ,    controller.findAll.bind(controller));
workflow_router.get('/:id' , controller.findById.bind(controller))



export default workflow_router;