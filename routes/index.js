import express from 'express';
import templeRoutes from './temples.js';
import memberRoutes from './members.js'

const router = express.Router();


//API routes
router.use('/temples', templeRoutes);
router.use('/members', memberRoutes);

export default router;

