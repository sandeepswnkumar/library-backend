import { Router } from "express";
import { register,login,logout } from "../Controllers/auth.controller.js";
import { auth } from "../Middleware/auth.middleware.js";
import CreateUserRequest from "../Requests/createUserRequest.js";
import LoginRequest from "../Requests/loginRequest.js";
import RefreshTokenRequest from "../Requests/refreshTokenRequest.js";

const router = Router()

//Open Route
router.route('/register').post(CreateUserRequest,register)
router.route('/login').post(LoginRequest,login)
// router.route('/refresh_token').post(RefreshTokenRequest,refresh_token)

//Auth Route
router.route('/logout').post(auth,logout)

export default router;