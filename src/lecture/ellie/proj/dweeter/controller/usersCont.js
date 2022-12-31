import bcrypt from 'bcrypt';

import config from "../configure/config.js";
import {createJwt} from "../middleware/auth/jwtAuth.js";
import * as repository from '../repository/usersMemRepo.js';

/**
 * << 회원 가입 >>
 * 1. 가입하려는 사용자의 username 이 이미 존재하는지 확인
 * 2. 사용 가능한 username 의 경우, 계정과 jwt token 생성
 * 3. 계정의 패스워드 정보를 제외하고, 계정 정보와 jwt token 반환
 */
export async function signup(req, res, next) {
    // 1.해당 username 의 사용자가 이미 존재하는지 검증
    const {username, password: plain, name, email} = req.body;
    const find = await repository.findByUsername(username);
    if (find) {
        console.log(`중복 사용자 회원 가입 시도 = |${username}|`)
        return res.status(409).json({message: "해당 사용자가 이미 존재합니다."});
    }
    
    // 2.사용자 계정 생성 및 저장
    const password = await bcrypt.hash(plain, config.bcrypt.saltRounds);
    const user = {username, password, name, email};
    const save = await repository.create(user);
    
    // 3.jwt 생성
    const accessToken = createJwt(save.id);
    
    // 4.계정 반환
    const ret = {...save, password: '*****', accessToken,};
    res.status(201).json(ret);
}

/**
 * << 로그인 >>
 * 1. 로그인 하려는 username 계정이 존재하는지 확인
 * 2. 해당 username 계정이 존재하는 경우, 패스워드 검증
 * 3. 패스워드 검증을 통과하면 jwt token 을 생성하여 반환
 */
export async function login(req, res, next) {
    // 1.해당 username 의 사용자가 존재하는지 검증
    const {username, password} = req.body;
    const find = await repository.findByUsername(username);
    if (!find) {
        console.error(`로그인 아이디 실패 = |${username}|`);
        return res.status(401).json({message: "아이디 혹은 패스워드를 확인해 주세요."});
    }
    
    // 2.패스워드 검증
    const check = await bcrypt.compare(password, find.password);
    if (!check) {
        console.error(`로그인 패스워드 실패 = |${password}|`);
        return res.status(401).json({message: "아이디 혹은 패스워드를 확인해 주세요."});
    }
    
    // 3.jwt 생성
    const token = {accessToken: createJwt(find.id),};
    res.status(200).json(token);
}

/**
 * << 모든 회원 목록 >>
 */
export async function getAll(req, res, next) {
    const users = await repository.findAll();
    res.status(200).json(users);
}
