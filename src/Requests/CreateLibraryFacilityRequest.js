
import { body } from "express-validator";

const CreateLibraryFacilityRequest = [
    body('libraryId').notEmpty().withMessage('Library Id is required').isNumeric().withMessage("Library Id should be number only"),
    body('libraryLocationId').notEmpty().withMessage('Library Location is required').isNumeric().withMessage("Library Location should be number only"),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').optional({ checkFalsy: true }),
    body('imageUrl').optional({ checkFalsy: true }),
]

export default CreateLibraryFacilityRequest
