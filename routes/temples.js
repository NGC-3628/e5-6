import express from 'express';
import { getAll,
         addTemples,
         getSingle,
         updateTemple,
         deleteTemple
 } from '../controllers/temples.js';

const router = express.Router();


router.get('/', getAll);
router.get('/', getSingle);
router.get('/', addTemples);
router.get('/', updateTemple);
router.get('/', deleteTemple);



export default router;


