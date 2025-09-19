import jwt from 'jsonwebtoken';
// import { User } from './models/user.model.js';
import ApiResponseCode from '../Enums/apiResponseCode.js';
// import { Token } from './models/token.model.js';
import { prisma } from '../primaClient.js';

export async function auth(req,res,next){
    try { 
        let token = req.header('Authorization')?.replace('Bearer ','');

        if(!token) throw new Error('Access Denied. No token provided.');

        let verifiedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        token = await  prisma.token.findUnique({where:{token}});

        if(!token) throw new Error('Invalid Access Token');

        const user = await prisma.user.findUnique({where: {id : verifiedToken?._id}});

        if(!user) throw new Error('Invalid Access Token');

        req.user = user;

    } catch (error) {
        let token = req.header('Authorization')?.replace('Bearer ','');
        if(token) await prisma.token.delete({where : {token}})
        return res.status(ApiResponseCode.UNAUTHORIZED)
        .json({
            success:false,
            message:"Invalid Access Token",
            description:error.message,
            status_code:ApiResponseCode.UNAUTHORIZED
        })
    }
    next();
}