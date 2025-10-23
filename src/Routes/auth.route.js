import { Router } from "express";
import { register,login,logout,getCurrentUser, refreshToken, adminLogin, registerAdmin, registerUser, verifyOTP, setMpin } from "../Controllers/auth.controller.js";
import { auth } from "../Middleware/auth.middleware.js";
import { CreateAdminUserRequest, CreateUserMPINRequest, CreateUserOTPRequest, CreateUserRequest } from "../Requests/createUserRequest.js";
import { AdminLoginRequest, LoginRequest, } from "../Requests/loginRequest.js";
import RefreshTokenRequest from "../Requests/refreshTokenRequest.js";

const router = Router()

//Open Route
router.route('/admin-login').post(AdminLoginRequest,adminLogin)
router.route('/login').post(LoginRequest,login)


router.route('/register-admin').post(CreateAdminUserRequest,registerAdmin)
router.route('/register-user').post(CreateUserRequest,registerUser)
router.route('/otp').post(CreateUserOTPRequest,verifyOTP)
router.route('/set-mpin').post(CreateUserMPINRequest,setMpin)
router.route('/current-user').get(auth, getCurrentUser)
router.route('/refresh-token').post(refreshToken)

//Auth Route
router.route('/logout').post(auth,logout)

export default router;