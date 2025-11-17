import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import { validationResult } from "express-validator";
import {
  buildFullName,
  createUser,
  getUser,
  updateUser,
  userCreateOrUpdate,
  UserExist,
} from "../Services/user.service.js";
import userTypeEnum from "../Enums/userTypeEnum.js";
import bcrypt from "bcrypt";
import { checkPassword } from "../Services/auth.service.js";
import {
  createToken,
  deleteToken,
  generateAccessToken,
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
    await updateUser(
      { id: user.id },
      {
        refreshToken: refreshToken.token,
      }
    );
    let accessToken = generateAccessToken(user);
    if (!accessToken.success) {
      throw new Error("Access token generation failed : " + accessToken.token);
    }
    const token = await createToken({
      token: accessToken.token,
      userId: user.id,
    });
    const userData = await getUser(user.id);
    return {
      ...token,
      user: userData,
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

    const isUserExist = UserExist({ phone })
    if (isUserExist) {
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "User Already Registered"
          )
        );
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false
    });

    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // valid for 5 min
    const user = await userCreateOrUpdate(
      { phone },
      { otp, otpExpiresAt },
      { phone, otp, otpExpiresAt, userTypeId: userTypeEnum.USER }
    );
    // TODO: Integrate with SMS provider (Twilio, MSG91, etc.)
    console.log(`OTP for ${phone} is ${otp}`);

    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(true, ApiResponseCode.CREATED, `OTP Sent Successfully ${otp}`)
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
    const user = await UserExist({ phone });
    if (!user)
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(false, ApiResponseCode.BAD_REQUEST, "User not found")
        );

    if (user.otp !== otp)
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(false, ApiResponseCode.BAD_REQUEST, "Invalid OTP")
        );

    if (user.otpExpiresAt < new Date())
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(false, ApiResponseCode.BAD_REQUEST, "OTP expired")
        );

    await updateUser(
      { phone },
      { phoneVerifiedAt: new Date(), otp: null, otpExpiresAt: null }
    );
    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(
          true,
          ApiResponseCode.CREATED,
          "OTP verified successfully"
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

export const setMpin = async (req, res) => {
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
    const { phone, mpin, confirmMpin } = req.body;
    if (mpin !== confirmMpin)
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "MPINs do not match"
          )
        );

    const user = await UserExist({ phone });
    if (!user)
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(false, ApiResponseCode.BAD_REQUEST, "User not found")
        );

    if (!user.phoneVerifiedAt)
      return res
        .status(ApiResponseCode.BAD_REQUEST)
        .json(
          new api_response(
            false,
            ApiResponseCode.BAD_REQUEST,
            "Phone not verified"
          )
        );

    // Hash MPIN
    const hashedMpin = await bcrypt.hash(String(mpin), 10);
    await updateUser({ phone }, { password: hashedMpin, isMpin: true });
    return res
      .status(ApiResponseCode.CREATED)
      .json(
        new api_response(
          true,
          ApiResponseCode.CREATED,
          "MPIN created successfully"
        )
      );
  } catch (error) {
    return res
      .status(ApiResponseCode.BAD_REQUEST)
      .json(
        new api_response(false, ApiResponseCode.BAD_REQUEST, error.message)
      );
  }
};
