import express from 'express';
import { isAuthenticated } from '../middleware/authenticate.js';
import { body, param, validationResult } from 'express-validator';
import { getAll,
         getSingle,
         addTemple,
         updateTemple,
         deleteTemple
 } from '../controllers/temples.js';

const router = express.Router();

//validator
 const schemaValidator = () => {
    return [
        body('name')
            .isString().withMessage('First name must be a String')
            .notEmpty().withMessage('First name is required'),
        body('address')
            .isString().withMessage('last name must be a String')
            .notEmpty().withMessage('lasr name is required'),
        body('anounced')
            .isNumber().withMessage('birthday name must be a number')
            .notEmpty().withMessage('birthday name is required'),
        body('breakground')
            .isNumber().withMessage('ward name must be a String')
            .notEmpty().withMessage('ward name is required'),
        body('dedication')
            .isNumber().withMessage('The ministering partner name must be a String')
            .notEmpty().withMessage('The ministering partner name is required'),
        body('notes')
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
router.post('/', isAuthenticated, schemaValidator(), validation, addTemple);
router.put('/:id', isAuthenticated, idValidator('id'), schemaValidator(), validation, updateTemple);
router.delete('/:id', isAuthenticated, idValidator('id'), validation, deleteTemple);



export default router;


