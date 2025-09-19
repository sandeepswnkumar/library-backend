
import { body } from "express-validator";

const CreateUserRequest = [

    body('firstName').notEmpty().withMessage('First Name is required'),
    body('lastName').notEmpty().withMessage('Last Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    body('phone').optional().isMobilePhone().withMessage('Please enter valid phone number'),
    body('middleName').optional().notEmpty().withMessage('Middle Name is required'),
    body('gender').optional().isIn(['MALE', 'FEMALE', 'OTHER']).withMessage('Invalid Gender'),
    // body('state').optional().notEmpty().withMessage('State is required'),
    // body('zip').optional().notEmpty().withMessage('Zip is required'),
    // body('country').optional().notEmpty().withMessage('Country is required'),
    // body('role').optional().notEmpty().withMessage('Role is required'),
]

export default CreateUserRequest
