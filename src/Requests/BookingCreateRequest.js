import { body } from "express-validator";

export const BookingCreateRequest = [
    body('libraryId')
        .notEmpty().withMessage('Library is required'),

    body('libraryLocationId')
        .notEmpty().withMessage('Library Location is required'),

    body('roomType')
        .notEmpty().withMessage('Room Type is required')
        .isInt().withMessage('Room Type must be a number'),

    body('unit')
        .notEmpty().withMessage('Unit is required')
        .isInt().withMessage('Unit must be a number'),

    body('noOfUnit')
        .notEmpty().withMessage('Number of units is required')
        .isInt({ min: 1 }).withMessage('Number of units must be at least 1'),

    body('libraryShiftId')
        .notEmpty().withMessage('Library Shift is required')
        .isInt().withMessage('Library Shift must be a number'),

    body('shiftPeriod')
        .notEmpty().withMessage('Shift Period is required'),

    body('bookingAmount')
        .notEmpty().withMessage('Booking Amount is required')
        .isFloat({ min: 0 }).withMessage('Booking Amount must be valid'),

    body('discountPercentage')
        .notEmpty().withMessage('Discount Percentage is required')
        .isFloat({ min: 0 }).withMessage('Discount Percentage must be valid'),

    body('discountAmount')
        .notEmpty().withMessage('Discount Amount is required')
        .isFloat({ min: 0 }).withMessage('Discount Amount must be valid'),

    body('totalAmount')
        .notEmpty().withMessage('Total Amount is required')
        .isFloat({ min: 0 }).withMessage('Total Amount must be valid'),

    body('startDate')
        .notEmpty().withMessage('Start Date is required')
        .matches(/^([0-2]\d|3[01])\/(0\d|1[0-2])\/\d{4}$/)
        .withMessage('Start Date must be in DD/MM/YYYY format'),
];


export default BookingCreateRequest

