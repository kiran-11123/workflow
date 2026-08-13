import { WorkFlowController } from '../controllers/workflow.controller.js';
import express from 'express'

const workflow_router = express.Router()

const controller = new WorkFlowController();

// Create a new workflow
workflow_router.post('/create' , controller.create.bind(controller));

// Get all workflows
workflow_router.get('/' ,    controller.findAll.bind(controller));

// Get workflow by ID
workflow_router.get('/:id' , controller.findById.bind(controller))

// Update workflow by ID
workflow_router.put('/:id' , controller.updateWorkflow.bind(controller));

// Delete workflow by ID
workflow_router.delete('/:id' , controller.deleteWorkFlow.bind(controller));

export default workflow_router;