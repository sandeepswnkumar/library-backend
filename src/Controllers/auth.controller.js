
import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { prisma } from "../primaClient.js"
import { buildFullName, createUser, updateUser, UserExist } from "../Services/user.service.js";
import userTypeEnum from "../Enums/userTypeEnum.js";
import bcrypt from "bcrypt";
import { checkPassword } from "../Services/auth.service.js";
import { createToken, deleteToken, generateAccessToken, generateRefreshToken, getTokenCurrenToken } from "../Services/token.service.js";

export async function login(req, res) {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, validationError.array()));
        }
        const { email, password } = req.body;
        const user = await UserExist(email)
        if (!user) {
            throw new Error('Invalid user');
        }
        const currentToken = await getTokenCurrenToken(email)
        if (currentToken) {
            if (verifyToken(currentToken.token)) {
                return res.status(ApiResponseCode.OK)
                    .json(new api_response(true, ApiResponseCode.CREATED, "User alrady loggedin", currentToken));
            }
        }
        let isPasswordCorrect = await checkPassword(user, password);
        if (!isPasswordCorrect) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, 'Invalid password'))
        }
        let token = await generateAccessAndRefreshToken(user);
        if (token.success !== undefined && !token.success) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, token.message))
        }
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'User login Successfully', token))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}

export async function logout(req, res) {
    try {
        let token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, "Access Denied. No, token provided"))
        }
        await deleteToken({ token })
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'User Log out Successfully'))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}

export async function refreshToken(req, res) {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            throw new TypeError(JSON.stringify(validationError.array()))
        }
        let verifiedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const { email, refreshToken } = req.body

        let user = await UserExist(email);
        if (!user) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, "Invalid user"))
        }

        let token = await generateAccessAndRefreshToken(user);
        if (!token.success) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, token.message))
        }
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Token refreshed Successfully', token))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))

    }
}

export async function generateAccessAndRefreshToken(user) {
    try {
        if (!user) throw new Error('Invalid user');
        let refreshToken = generateRefreshToken(user);
        if (!refreshToken.success) {
            throw new Error("Refresh token generation failed : " + refreshToken.token)
        }
        await updateUser(user.email, {
            refreshToken: refreshToken.token
        })
        let accessToken = generateAccessToken(user);
        if (!accessToken.success) {
            throw new Error("Access token generation failed : " + accessToken.token)
        }
        const token = await createToken({
            token: accessToken.token,
            userId: user.id,
        })
        return {
            ...token,
            user: user
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export async function register(req, res) {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, validationError.array()));
        }

        const { email, phone, password, userType, firstName, middleName, lastName, gender, dob, heightInCm, weightInKg, profileImage } = req.body;
        const isUserExist = await UserExist(email);
        if (isUserExist)
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, "User already exists"));

        // ✅ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

        const userData = {
            email,
            password: hashedPassword,
            phone: phone || null,
            userType: userType || userTypeEnum.USER,
            emailVerified: false,
            phoneVerified: false,
        };
        const userDetailData = {
            firstName,
            middleName: middleName || null,
            lastName,
            fullName: buildFullName({ firstName, middleName, lastName }),
            gender: gender || null,
            dob: dob || null,
            gender: gender || null,
            dob: dob || null,
            heightInCm: heightInCm || null,
            weightInKg: weightInKg || null,
            profileImage: profileImage || null,
        };
        const user = await createUser(userData, userDetailData);
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'User Created Successfully', user))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}
