import jwt from 'jsonwebtoken';
import config from '../../configure/config.js';
import CONSTANT from "../../configure/CONSTANT.js";
import * as repository from '../../repository/mysql/usersDbSqlRepo.js';
// import * as repository from '../../repository/memory/usersMemRepo.js';

const AUTH_PASS = [
    '/auth/login',
    '/auth/signup',
];

/**
 * AUTH_PATH 에 등록된 url 은 jwt 검증을 받지 않는다.
 * 회원 가입이나 로그인의 경우 jwt 를 갖고 있지 않다.
 *
 * @param path
 * @returns {boolean}
 */
const isPass = (path) => AUTH_PASS.includes(path);

/**
 * jwt 를 생성한다.
 * jwt 는 payload 의 변조를 확인할 수 있지만, 내용이 공개되는 것을 막을 수는 없다.
 * 따라서 payload 내부에 보안 관련 정보나 개인 정보를 넣어서는 안된다.
 */
export const createJwt = (id) => {
    return jwt.sign(
        {id},
        config.jwt.secretKey,
        {expiresIn: config.jwt.expiresInSecs});
};

/**
 */
export const authProc = (req, res, next) => {
    if (isPass(req.url))
        return next();
    
    // 인증헤더 읽기
    const authHeader = req.get(CONSTANT.AUTH.HEADER);
    if (!authHeader || !authHeader.startsWith(CONSTANT.AUTH.PREFIX)) {
        console.error(`인증 헤더를 확인 필요 = |${authHeader}|`);
        return res.status(401).json({message: '인증에 실패하였습니다.'});
    }
    
    // 토큰을 읽어서 검증하기
    // . 토큰 검증은 비동기로 진행된다.
    // . 비동기 함수에 의해 검증이 성공했을 때만 next() 에 의해 다음으로 진행된다.
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if (error) {
            console.error(`토큰 검증 실패 = |${error}|`);
            return res.status(401).json({message: '인증에 실패하였습니다.'});
        }
        
        // 토큰의 내용을 사용하여 사용자 정보를 확인한다.
        const userId = decoded.id;
        const user = await repository.findById(userId);
        if (!user) {
            console.error(`사용자가 존재하지 않음, userId = |${userId}|`);
            return res.status(401).json({message: '인증에 실패하였습니다.'});
        }
        
        // 사용자 정보를 req 객체에 담는다.
        req.user = user;
        
        return next();
    });
}
