import express from 'express';
import templeRoutes from './temples,js';

const router = express.Router();


//API routes
router.use('/temples', templeRoutes);

export default router;

