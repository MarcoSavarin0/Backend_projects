import { Router } from 'express';
import { getWeather } from '../controller/controller.js';
const router = Router();

router.get('/', getWeather);

export default router;