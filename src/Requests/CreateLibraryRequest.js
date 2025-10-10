import { body } from "express-validator";

const CreateLibraryRequest = [

    body('libraryName').notEmpty().withMessage('Library Name is required'),
    body('statusId').notEmpty().withMessage('Status is required').isNumeric().withMessage('Status should be number only'),
    body('typeId').notEmpty().withMessage('Type is required').isNumeric().withMessage('Type should be number only'),
]

export default CreateLibraryRequest
