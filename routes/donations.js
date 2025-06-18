import express from 'express';
import { isAuthenticated } from '../middleware/authenticate.js';
import { body, param, validationResult } from 'express-validator';
import{
    getAllDonations,
    getSingleDonation,
    addDonation,
    updateDonation,
    deleteDonation
} from '../controllers/donations.js';

const router = express.Router();

//validator
const schemaValidator = () => {
    return[
        body('member')
            .isString().withMessage('Name must be a String')
            .notEmpty().withMessage('Name is required'),
        body('donationType')
            .isString().withMessage('The type of donation must be a String')
            .notEmpty().withMessage('lasr name is required'),
        body('amount')
            .isNumeric().withMessage('The amount must be a Number')
            .notEmpty().withMessage('The amount date is required')
    ];
};

const idValidator = (id = 'id') => {
    return [param(id).isMongoId().withMessage(`The id ${id} is not a valid MongoDB id`)]
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

router.get('/', isAuthenticated, getAllDonations);
router.get('/:id',isAuthenticated ,idValidator('id'), validation, getSingleDonation);
router.post('/', isAuthenticated, schemaValidator(), validation, addDonation);
router.put('/:id', isAuthenticated, idValidator('id'), schemaValidator(), validation, updateDonation);
router.delete('/:id', isAuthenticated, idValidator('id'), validation, deleteDonation);


export default router;



























