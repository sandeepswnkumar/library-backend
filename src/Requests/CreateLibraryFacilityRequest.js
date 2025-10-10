
import { body } from "express-validator";

const CreateLibraryFacilityRequest = [
    body('libraryId').notEmpty().withMessage('Library Id is required').isNumeric().withMessage("Library Id should be number only"),
    body('libraryLocationId').notEmpty().withMessage('Library Location is required').isNumeric().withMessage("Library Location should be number only"),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').optional().notEmpty().withMessage('Description is required'),
    body('imageUrl').optional().notEmpty().withMessage('Image url is required'),
    body('address2').optional().notEmpty().withMessage('Address 2 is required'),
    body('cityId').optional().notEmpty().withMessage('City is required').isNumeric().withMessage("City should be numeric only"),
    body('stateId').optional().notEmpty().withMessage('State is required').isNumeric().withMessage("State should be numeric only"),
    body('countryId').optional().notEmpty().withMessage('Country is required').isNumeric().withMessage("Contry should be numeric only"),
    body('pincode').optional().notEmpty().withMessage('Pincode is required'),
    body('latitude').optional().notEmpty().withMessage('Latitude is required'),
    body('longitude').optional().notEmpty().withMessage('Longitude is required'),
    body('mapUrl').optional().notEmpty().withMessage('mapUrl is required'),
]

export default CreateLibraryFacilityRequest
