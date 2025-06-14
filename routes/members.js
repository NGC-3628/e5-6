import express from 'express';
import { getAll,
         getSingle,
         addMember,
         updateMember,
         deleteMember
 } from '../controllers/members.js';

 const router = express.Router();


 router.get('/', getAll);
 router.get('/:id', getSingle);
 router.post('/', addMember);
 router.put('/:id', updateMember);
 router.delete('/:id', deleteMember);

 export default router;