import { body } from "express-validator";

export const AdminLoginRequest = [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
]

export const LoginRequest = [
    body('phone').notEmpty().withMessage('Phone is required'),
    body('mpin').notEmpty().withMessage('MPin is required')
]