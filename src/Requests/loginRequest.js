import { body } from "express-validator";

export const AdminLoginRequest = [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
]