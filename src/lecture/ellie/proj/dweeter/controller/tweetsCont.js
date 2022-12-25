import * as repository from '../repository/tweetsRepo.js';

/**
 * << 검색 >>
 * 1. query 인자로 username 정보가 존재하는지 확인
 * 2. 조건에 따라 특정 username 의 tweet 검색 혹은 전체 검색
 */
export async function getList(req, res, next) {
    const username = req.query.username;
    const ret = await (username
        ? repository.findByUsername(username)
        : repository.findAll());
    res.status(200).json(ret);
}

/**
 * << 검색 >>
 * 1. 특정 tweet 을 검색
 */
export async function getById(req, res, next) {
    const id = req.params.id;
    const ret = await repository.findById(id);
    if (ret) {
        res.status(200).json(ret);
    } else {
        res.status(404).json({
            message: `해당 id(${id})의 데이터를 찾을 수 없습니다.`,
        });
    }
}

/**
 * << 생성 >>
 */
export async function create(req, res, next) {
    const {id} = req.user;
    
    // 생성 내용
    const {text} = req.body;
    
    const ret = await repository.create(id, text);
    res.status(201).json(ret);
}

/**
 * << 갱신 >>
 */
export async function update(req, res, next) {
    const userId = req.user.id;
    const tweetId = req.params.id;
    
    const find = await repository.findById(tweetId);
    if (!find) {
        return res.status(404).json({message: '해당 tweet 이 존재하지 않습니다.'});
    }
    if (find.userId !== userId) {
        return res.status(403).json({message: '해당 tweet 을 수정할 권한이 없습니다.'});
    }
    
    // 갱신 내용
    const {text} = req.body;
    
    const ret = await repository.update(userId, text);
    if (ret) {
        res.status(200).json(ret);
    } else {
        res.status(404).json({
            message: `해당 id(${tweetId})의 데이터를 찾을 수 없습니다.`,
        });
    }
}

/**
 * << 삭제 >>
 */
export async function remove(req, res, next) {
    const userId = req.user.id;
    const tweetId = req.params.id;
    const find = await repository.findById(tweetId);
    if (find) {
        if (find.userId !== userId) {
            return res.status(403).json({message: '해당 tweet 을 삭제할 권한이 없습니다.'});
        }
        await repository.remove(tweetId);
    }
    
    res.sendStatus(204);
}
