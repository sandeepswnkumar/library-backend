import { body } from "express-validator";

const CreateLibraryLocationRequest = [
  body('libraryId')
    .notEmpty().withMessage('Library Id is required')
    .isNumeric().withMessage("Library Id should be number only"),

  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage("Invalid email type"),

  body('phone')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage("Invalid phone type"),

  body('address1')
    .optional({ checkFalsy: true }),

  body('address2')
    .optional({ checkFalsy: true }),

  body('cityId')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage("City should be numeric only"),

  body('stateId')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage("State should be numeric only"),

  body('countryId')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage("Country should be numeric only"),

  body('pincode')
    .optional({ checkFalsy: true }),

  body('latitude')
    .optional({ checkFalsy: true }),

  body('longitude')
    .optional({ checkFalsy: true }),

  body('mapUrl')
    .optional({ checkFalsy: true }),
];

export default CreateLibraryLocationRequest;
