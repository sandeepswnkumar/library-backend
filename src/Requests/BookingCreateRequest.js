
import { body } from "express-validator";

export const BookingCreateRequest = [
    body('roomTypeId').notEmpty().withMessage('Room Type is required'),
    body('bookingType').notEmpty().withMessage('Booking Type is required'),
    body('unit').notEmpty().withMessage('Booking Type is required'),
    body('noOfunit').notEmpty().withMessage('Booking Type is required'),
    body('isSubscription').notEmpty().withMessage('Booking Type is required'),
    body('startDate').notEmpty().withMessage('Start Date is required'),
    body('startTime').notEmpty().withMessage('Start Date is required'),
    body('endDate').notEmpty().withMessage('End Date is required'),
    body('endTime').notEmpty().withMessage('End Time is required'),
]

