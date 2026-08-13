import express from 'express'
import { Router } from 'express';
const circuit_breaker_test: Router = Router();
import { CircuitBreakerController } from '../controllers/circuit.breaker.test.controller.js';


circuit_breaker_test.get('/health' , CircuitBreakerController)


export default circuit_breaker_test