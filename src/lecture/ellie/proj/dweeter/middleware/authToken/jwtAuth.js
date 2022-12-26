import jwt from 'jsonwebtoken';
import * as repository from '../../repository/authRepo.js';
import {config} from '../../configure/config.js';

const AUTH_HEADER = 'Authorization';
const AUTH_PREFIX = 'Bearer';
const AUTH_PASS = [
    '/auth/login',
    '/auth/signup',
];

export const createJwt = (data) => {
    return jwt.sign({id: data}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSecs});
};

const isPass = (path) => {
    return AUTH_PASS.includes(path);
}

export const isAuth = (req, res, next) => {
    if (isPass(req.url)) {
        return next();
    }
    
    const authHeader = req.get(AUTH_HEADER);
    if (!authHeader || !authHeader.startsWith(AUTH_PREFIX)) {
        console.error(`인증 해더=|${authHeader}|`);
        return res.status(401).json({message: '인증에 실패하였습니다.'});
    }
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if (error) {
            console.error(`토큰 검증 실패=|${error}|`);
            return res.status(401).json({message: '인증에 실패하였습니다.'});
        }
        
        const userId = decoded.id;
        const user = await repository.findById(userId);
        if (!user) {
            console.error(`사용자가 존재하지 않습니다. userid=|${userId}|`);
            return res.status(401).json({message: '인증에 실패하였습니다.'});
        }
        
        req.user = user;
        return next();
    });
}
