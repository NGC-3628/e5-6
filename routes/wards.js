import express from 'express';
import { isAuthenticated } from '../middleware/authenticate.js';
import{ body, param, validationResult } from 'express-validator';
import { getAll,
         getSingle,
         addWard,
         updateWard,
         deleteWard
 } from '../controllers/wards.js';

 const router = express.Router();

//validator
const schemaValidator = () => {
    return[
        body('bishop')
            .isString().withMessage('Bishop\'s name must be a String')
            .notEmpty().withMessage('Bishop\'s name is required'),
        body('membership')
            .isNumeric().withMessage('The membership number must be a number')
            .notEmpty().withMessage('The membership number is required'),
        body('address')
            .isString().withMessage('The address must be a String')
            .notEmpty().withMessage('The address date is required')
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
};

 router.get('/', getAll);
 router.get('/:id', idValidator('id'), validation, getSingle);
 router.post('/', isAuthenticated, schemaValidator(), validation, addWard);
 router.put('/:id', isAuthenticated, idValidator('id'), schemaValidator(), validation, updateWard);
 router.delete('/:id', isAuthenticated, idValidator('id'), validation, deleteWard);

 export default router;
