import express from 'express';
import { isAuthenticated } from '../middleware/authenticate.js';
import{ body, param, validationResult } from 'express-validator';
import { getAll,
         getSingle,
         addMember,
         updateMember,
         deleteMember
 } from '../controllers/members.js';

 const router = express.Router();


 //validator
 const schemaValidator = () => {
    return [
        body('firstName')
            .isString().withMessage('First name must be a String')
            .notEmpty().withMessage('First name is required'),
        body('lastName')
            .isString().withMessage('last name must be a String')
            .notEmpty().withMessage('lasr name is required'),
        body('birthday')
            .isString().withMessage('birthday date must be a string')
            .notEmpty().withMessage('birthday date is required'),
        body('ward')
            .isString().withMessage('ward name must be a String')
            .notEmpty().withMessage('ward name is required'),
        body('ministeringPartner')
            .isString().withMessage('The ministering partner name must be a String')
            .notEmpty().withMessage('The ministering partner name is required'),
        body('servedMission')
            .isString().withMessage('The served mission must be a String')
            .notEmpty().withMessage('The served mission is required'),
    ];
 };

 const idValidator = (id = 'id') => {
    return [param(id).isMongoId().withMessage(`The id ${id} is not a valid Mongo id`)]
 };

 const validation = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    const givenErrors = [];
    errors.array().map(err => givenErrors.push({[err.path]: err.msg}));
    return res.status(400).json({errors:givenErrors});
 }


 router.get('/', getAll);
 router.get('/:id', idValidator('id'), validation, getSingle);
 router.post('/', isAuthenticated, schemaValidator(), validation, addMember);
 router.put('/:id', isAuthenticated, idValidator('id'), schemaValidator(), validation, updateMember);
 router.delete('/:id', isAuthenticated, idValidator('id'), validation, deleteMember);

 export default router;