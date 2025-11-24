import { Router } from "express";
import authRoute from "./Routes/auth.route.js"
import userRoute from "./Routes/user.route.js"
import libaryRoute from "./Routes/library.route.js"
import libaryLocationRoute from "./Routes/libraryLocation.route.js"
import libaryFacilityRoute from "./Routes/libraryFacility.route.js"
import libraryShiftAndPrice from "./Routes/libraryShiftAndPrice.route.js"
import miscellaneousRoute from "./Routes/miscellaneous.route.js"
import { auth } from "./Middleware/auth.middleware.js";
import api_response from "./Utils/apiResponse.js";
import ApiResponseCode from "./Enums/apiResponseCode.js";

const router = Router()

router.use('/auth', authRoute);
router.use('/users', auth, userRoute)
router.use('/library', auth, libaryRoute)
router.use('/library-location', auth, libaryLocationRoute)
router.use('/library-shift-price', auth, libraryShiftAndPrice)
router.use('/library-facility', auth, libaryFacilityRoute)
router.use('/misc', auth, miscellaneousRoute)

router.use((req, res, next) => {
    res.status(ApiResponseCode.NOT_FOUND).json(new api_response(false, ApiResponseCode.NOT_FOUND, "Resource not found"));
});



export default router