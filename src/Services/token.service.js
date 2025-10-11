import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
import tokenTypeEnum from "../Enums/tokenTypeEnum.js";


export const createToken = async (data) => {
    return await prisma.token.create({
        data: {
            token: data.token,
            user: {
                connect: { id: data.userId }
            }
        }
    });
};


export const getTokenCurrenToken = async (userId) => {
    return await prisma.token.findFirst({
        where: {
            user: {
                id: userId
            }
        },
        include: {
            user: true // optional if you want user details too
        }

    });
}


export const deleteToken = async (condition) => {
    return await prisma.token.delete({
        where: { ...condition }
    });
}


export const generateAccessToken = (user) => {
    try {
        if (!user) {
            throw Error("Invalid user")
        }
        // ✅ Generate tokens
        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        return {
            success: true,
            token: accessToken
        }
    } catch (err) {
        return {
            success: false,
            token: null
        }
    }
}
export const generateRefreshToken = (user) => {
    try {
        if (!user) {
            throw Error("Invalid user")
        }
        // ✅ Generate tokens
        const refreshToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        return {
            success: true,
            token: refreshToken
        }
    } catch (err) {
        return {
            success: false,
            token: err
        }
    }
}


export const verifyToken = (token, tokenType = '') => {
    try {
        let payload = null
        if (tokenType == tokenTypeEnum.ACCESS_TOKEN) {
            payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } else if (tokenType == tokenTypeEnum.REFRESH_TOKEN) {
            payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } else {
            throw new Error("Invalid token type")
        }
        return true
    } catch (err) {
        if(token){
            try{
                deleteToken({token})
            }catch(cerr){
                console.log("cerr == ", cerr)
            }
        }
        return false
    }
}