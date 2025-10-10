
import { body } from "express-validator";

const CreateLibraryLocationRequest = [

    body('libraryId').notEmpty().withMessage('Library Id is required').isNumeric().withMessage("Library Id should be number only"),
    body('email').optional().notEmpty().withMessage('Email is required').isEmail().withMessage("Invalid email type"),
    body('phone').optional().notEmpty().withMessage('Phone is required').isNumeric().withMessage("Invalid phone type"),
    body('address1').optional().notEmpty().withMessage('Address 1 is required'),
    body('address2').optional().notEmpty().withMessage('Address 2 is required'),
    body('cityId').optional().notEmpty().withMessage('City is required').isNumeric().withMessage("City should be numeric only"),
    body('stateId').optional().notEmpty().withMessage('State is required').isNumeric().withMessage("State should be numeric only"),
    body('countryId').optional().notEmpty().withMessage('Country is required').isNumeric().withMessage("Contry should be numeric only"),
    body('pincode').optional().notEmpty().withMessage('Pincode is required'),
    body('latitude').optional().notEmpty().withMessage('Latitude is required'),
    body('longitude').optional().notEmpty().withMessage('Longitude is required'),
    body('mapUrl').optional().notEmpty().withMessage('mapUrl is required'),
    
]

export default CreateLibraryLocationRequest
