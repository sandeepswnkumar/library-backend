import jwt from 'jsonwebtoken';
import ApiResponseCode from '../Enums/apiResponseCode.js';
import { prisma } from '../prismaClient.js';
import { deleteToken } from '../Services/token.service.js';

export async function auth(req, res, next) {
    try {
        let token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('Access Denied. No token provided.');
        let verifiedToken = null
        try {
            verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            const currentToken = await prisma.token.findFirst({ where: { token } });
            if (!currentToken) throw new Error('Invalid Access Token');
            if (token) await deleteToken({ token })
        }
        if(!verifiedToken){
            throw new Error('Invalid Access Token');
        }
        const currentToken = await prisma.token.findFirst({ where: { userId: verifiedToken.userId, token } });
        if (!currentToken) throw new Error('Invalid Access Token');
        const user = await prisma.user.findUnique({ where: { id: verifiedToken.userId } });
        if (!user) throw new Error('Invalid Access Token');
        req.user = user;
    } catch (error) {
        console.error("Error stack trace:", error.stack);
        return res.status(ApiResponseCode.UNAUTHORIZED)
            .json({
                success: false,
                message: "Invalid Access Token",
                description: error.message,
                status_code: ApiResponseCode.UNAUTHORIZED
            })
    }
    next();
}