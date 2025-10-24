
import { body } from "express-validator";

export const CreateAdminUserRequest = [
    body('firstName').notEmpty().withMessage('First Name is required'),
    body('middleName').optional().notEmpty().withMessage('Middle Name is required'),
    body('lastName').notEmpty().withMessage('Last Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter valid email'),
    body('password').notEmpty().withMessage('Password is required'),
]


export const CreateUserRequest = [
    body('phone').notEmpty().withMessage('Phone is required')
]
export const CreateUserOTPRequest = [
    body('phone').notEmpty().withMessage('Phone is required'),
    body('otp').notEmpty().withMessage('OTP is required')
    
]
export const CreateUserMPINRequest = [
    body('phone').notEmpty().withMessage('Phone is required'),
    body('mpin').notEmpty().withMessage('MPIN is required'),
    body('confirm_mpin').notEmpty().withMessage('Confirm MPIN is required')
]

