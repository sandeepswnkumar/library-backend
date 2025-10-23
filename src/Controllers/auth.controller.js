import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import {
  buildFullName,
  createOnlyUser,
  createUser,
  getUser,
  getUsers,
  UserExist,
} from "../Services/user.service.js";
import userTypeEnum from "../Enums/userTypeEnum.js";
import bcrypt from "bcrypt";
import { checkPassword } from "../Services/auth.service.js";
import {
  createToken,
  deleteToken,
  generateAccessToken,
  generateOTPToken,
  generateRefreshToken,
  getToken,
  getTokenCurrenToken,
  verifyToken,
} from "../Services/token.service.js";
import tokenTypeEnum from "../Enums/tokenTypeEnum.js";
import otpGenerator from "otp-generator";

export async function adminLogin(req, res) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            validationError.array()
          )
        );
    }
    const { email, password } = req.body;
    const user = await UserExist({ email, userTypeId: userTypeEnum.ADMIN });
    if (!user) {
      throw new Error("Invalid user");
    }
    const currentToken = await getTokenCurrenToken(user.id);
    if (currentToken) {
      if (verifyToken(currentToken.token, tokenTypeEnum.ACCESS_TOKEN)) {
        return res
          .status(ApiResponseCode.OK)
          .json(
            new api_response(
              true,
              ApiResponseCode.CREATED,
              "User alrady logged in",
              currentToken
            )
          );
      }
    }
    let isPasswordCorrect = await checkPassword(user, password);
    if (!isPasswordCorrect) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "Invalid password"
          )
        );
    }
    let token = await generateAccessAndRefreshToken(user);
    if (token.success !== undefined && !token.success) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(false, ApiResponseCode.BAD_REQUEST, token.message)
        );
    }
    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(
          true,
          ApiResponseCode.CREATED,
          "User login Successfully",
          token
        )
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}

export async function login(req, res) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            validationError.array()
          )
        );
    }
    const { phone, mpin } = req.body;
    const user = await UserExist({ phone, userTypeId: userTypeEnum.USER });
    if (!user) {
      throw new Error("Invalid user");
    }
    const currentToken = await getTokenCurrenToken(user.id);
    if (currentToken) {
      if (verifyToken(currentToken.token, tokenTypeEnum.ACCESS_TOKEN)) {
        return res
          .status(ApiResponseCode.OK)
          .json(
            new api_response(
              true,
              ApiResponseCode.CREATED,
              "User alrady logged in",
              currentToken
            )
          );
      }
    }
    let isPasswordCorrect = await checkPassword(user, mpin);
    if (!isPasswordCorrect) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "Invalid password"
          )
        );
    }
    let token = await generateAccessAndRefreshToken(user);
    if (token.success !== undefined && !token.success) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(false, ApiResponseCode.BAD_REQUEST, token.message)
        );
    }
    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(
          true,
          ApiResponseCode.CREATED,
          "User login Successfully",
          token
        )
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}

export async function login(req, res) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            validationError.array()
          )
        );
    }
    const { phone, mpin } = req.body;
    const user = await UserExist({ phone, userTypeId: userTypeEnum.USER });
    if (!user) {
      throw new Error("Invalid user");
    }
    const currentToken = await getTokenCurrenToken(user.id);
    if (currentToken) {
      if (verifyToken(currentToken.token, tokenTypeEnum.ACCESS_TOKEN)) {
        return res
          .status(ApiResponseCode.OK)
          .json(
            new api_response(
              true,
              ApiResponseCode.CREATED,
              "User alrady logged in",
              currentToken
            )
          );
      }
    }
    let isPasswordCorrect = await checkPassword(user, mpin);
    if (!isPasswordCorrect) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "Invalid password"
          )
        );
    }
    let token = await generateAccessAndRefreshToken(user);
    if (token.success !== undefined && !token.success) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(false, ApiResponseCode.BAD_REQUEST, token.message)
        );
    }
    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(
          true,
          ApiResponseCode.CREATED,
          "User login Successfully",
          token
        )
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}

export async function getCurrentUser(req, res) {
  try {
    const user = await getUser(req.user.id);
    return res
      .status(ApiResponseCode.OK)
      .json(
        new api_response(
          true,
          ApiResponseCode.OK,
          "User Fetched Successfully",
          user
        )
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}

export async function logout(req, res) {
  try {
    let token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "Access Denied. No, token provided"
          )
        );
    }
    await deleteToken({ token });
    return res
      .status(ApiResponseCode.OK)
      .json(
        new api_response(true, ApiResponseCode.OK, "User Log out Successfully")
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}

export async function refreshToken(req, res) {
  try {
    let token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "Access Denied. No, token provided"
          )
        );
    }
    const tokenData = await getToken({ token });
    if (!tokenData) throw new Error("Invalid Access Token");
    let user = await getUser(tokenData.userId);
    if (!user) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(false, ApiResponseCode.BAD_REQUEST, "Invalid user")
        );
    }

    let accessToken = await generateAccessAndRefreshToken(user);
    if (accessToken.success !== undefined && !accessToken.success) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            accessToken.message
          )
        );
    }
    return res
      .status(ApiResponseCode.OK)
      .json(
        new api_response(
          true,
          ApiResponseCode.OK,
          "Token refreshed Successfully",
          accessToken
        )
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}

export async function generateAccessAndRefreshToken(user) {
  try {
    if (!user) throw new Error("Invalid user");
    let refreshToken = generateRefreshToken(user);
    if (!refreshToken.success) {
      throw new Error(
        "Refresh token generation failed : " + refreshToken.token
      );
    }
    // await updateUser(user.email, {
    //     refreshToken: refreshToken.token
    // })
    let accessToken = generateAccessToken(user);
    if (!accessToken.success) {
      throw new Error("Access token generation failed : " + accessToken.token);
    }
    const token = await createToken({
      token: accessToken.token,
      userId: user.id,
    });
    return {
      ...token,
      user: user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function registerAdmin(req, res) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            validationError.array()
          )
        );
    }

    const { email, password, firstName, middleName, lastName, userType } =
      req.body;

    const isUserExist = await UserExist({ email });
    if (isUserExist)
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "User already exists"
          )
        );

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      password: hashedPassword,
      userTypeId: userType || userTypeEnum.USER,
    };
    const userDetailData = {
      firstName,
      middleName: middleName || "",
      lastName,
      fullName: buildFullName({ firstName, middleName, lastName }),
    };
    const user = await createUser(userData, userDetailData);
    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(
          true,
          ApiResponseCode.CREATED,
          "User Created Successfully",
          user
        )
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}

export async function registerUser(req, res) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            validationError.array()
          )
        );
    }
    const { phone } = req.body;

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // valid for 5 min

    const user = await prisma.user.upsert({
      where: { phone },
      update: { otp, otpExpiresAt },
      create: { phone, otp, otpExpiresAt },
    });

    // TODO: Integrate with SMS provider (Twilio, MSG91, etc.)
    console.log(`OTP for ${phone} is ${otp}`);

    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(true, ApiResponseCode.CREATED, "OTP Sent Successfully")
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}

export async function verifyOTP(req, res) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            validationError.array()
          )
        );
    }

    const { phone, otp } = req.body;
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    await prisma.user.update({
      where: { phone },
      data: { isVerified: true, otp: null, otpExpiresAt: null },
    });
    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(true, ApiResponseCode.CREATED, "OTP verified successfully")
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
}


export const setMpin = async (req, res) => {
  try {
    const { phone, mpin, confirm_mpin } = req.body;
    if (!phone || !mpin || !confirm_mpin)
      return res.status(400).json({ message: "All fields required" });

    if (mpin !== confirm_mpin)
      return res.status(400).json({ message: "MPINs do not match" });

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified)
      return res.status(403).json({ message: "Phone not verified" });

    // Hash MPIN
    const hashedMpin = await bcrypt.hash(mpin, 10);

    await prisma.user.update({
      where: { phone },
      data: { password: hashedMpin },
    });

    res.json({ message: "MPIN created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error setting MPIN" });
  }
};
