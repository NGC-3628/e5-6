import express from 'express';
import { getAll,
         getSingle,
         addTemple,
         updateTemple,
         deleteTemple
 } from '../controllers/temples.js';

const router = express.Router();


router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', addTemple);
router.put('/:id', updateTemple);
router.delete('/:id', deleteTemple);



export default router;


