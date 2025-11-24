import { body } from "express-validator";

const CreateShiftAndPriceRequest = [

    body('libraryId')
        .notEmpty().withMessage('Library ID is required')
        .isNumeric().withMessage('Library ID should be number only'),

    body('libraryLocationId')
        .notEmpty().withMessage('Library Location ID is required')
        .isNumeric().withMessage('Library Location ID should be number only'),

    body('libraryRoomTypeId')
        .notEmpty().withMessage('Library Room Type ID is required')
        .isNumeric().withMessage('Library Room Type ID should be number only'),

    body('libraryBookingUnitId')
        .notEmpty().withMessage('Library Booking Unit ID is required')
        .isNumeric().withMessage('Library Booking Unit ID should be number only'),

    body('period')
        .notEmpty().withMessage('Period is required')
        .isString().withMessage('Period should be string'),

    body('startTime')
        .notEmpty().withMessage('Start Time is required')
        .isString().withMessage('Start Time should be string'),

    body('endTime')
        .notEmpty().withMessage('End Time is required')
        .isString().withMessage('End Time should be string'),

    body('rate')
        .notEmpty().withMessage('Rate is required')
        .isFloat().withMessage('Rate should be numeric'),
];

export default CreateShiftAndPriceRequest;
