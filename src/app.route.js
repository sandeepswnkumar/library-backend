import { Router } from "express";
import authRoute from "./Routes/auth.route.js"
import userRoute from "./Routes/user.route.js"
import { auth } from "./Middleware/auth.middleware.js";
import api_response from "./Utils/apiResponse.js";
import ApiResponseCode from "./Enums/apiResponseCode.js";

const router = Router()

router.use('/auth', authRoute);
router.use('/users', auth, userRoute)
router.use('/library', auth, userRoute)

router.use((req, res, next) => {
    res.status(ApiResponseCode.NOT_FOUND).json(new api_response(false, ApiResponseCode.NOT_FOUND, "Resource not found"));
});



export default router