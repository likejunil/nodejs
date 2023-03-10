// import * as repository from '../repository/mysql/tweetsDbSqlRepo.js';
import * as repository from '../repository/sequelize/tweetsSequelRepo.js';
// import * as repository from '../repository/mongo/tweetsMongoRepo.js';

/**
 * << 검색 >>
 * 1. query 인자로 username 정보가 존재하는지 확인
 * 2. 조건에 따라 특정 username 의 tweet 검색 혹은 전체 검색
 */
export const getList = async (req, res) => {
    const {username} = req.query;
    const ret = await (username
        ? repository.findByUsername(username)
        : repository.findAll());
    
    res.status(200).json(ret ?? []);
}

/**
 * << 검색 >>
 * 1. 특정 tweet 을 검색
 */
export const getById = async (req, res) => {
    const {id} = req.params;
    const ret = await repository.findById(id);
    if (!ret) {
        console.error(`(검색)해당 글을 찾을 수 없음, id = |${id}}|`);
        return res.status(404).json({message: `해당 id(${id})의 데이터를 찾을 수 없습니다.`});
    }
    
    res.status(200).json(ret);
}

/**
 * << 생성 >>
 */
export const create = async (req, res) => {
    const {id} = req.user;
    
    // 생성 내용
    const body = req.body;
    
    const ret = await repository.create(id, body);
    res.status(201).json(ret);
}

/**
 * << 갱신 >>
 */
export const update = async (req, res) => {
    const {id: userId} = req.user;
    const {id: tweetid} = req.params;
    
    const find = await repository.findById(tweetid);
    if (!find) {
        console.error(`(갱신)해당 글을 찾을 수 없음, tweetid = |${tweetid}}|`);
        return res.status(404).json({message: '해당 tweet 이 존재하지 않습니다.'});
    }
    if (find.userId !== userId) {
        console.error(`(갱신)해당 글에 대한 권한이 없음, tweetid = |${tweetid}}|, userId = |${userId}|`);
        return res.status(403).json({message: '해당 tweet 을 수정할 권한이 없습니다.'});
    }
    
    // 갱신 내용
    const {text} = req.body;
    const save = {...find, text};
    
    const ret = await repository.update(save);
    if (!ret) {
        console.error(`(갱신)해당 글을 수정하지 못했음 , tweetid = |${tweetid}}|, userId = |${userId}|`);
        return res.status(404).json({message: '글을 수정하지 못했습니다.'});
    }
    
    res.status(200).json(save);
}

/**
 * << 삭제 >>
 */
export const remove = async (req, res) => {
    const {id: userId} = req.user;
    const {id: tweetid} = req.params;
    const find = await repository.findById(tweetid);
    if (find) {
        if (find.userId !== userId) {
            console.error(`해당 글을 삭제할 권한이 없음 , tweetid = |${tweetid}}|, userId = |${userId}|`);
            return res.status(403).json({message: '해당 tweet 을 삭제할 권한이 없습니다.'});
        }
        const count = await repository.remove(tweetid);
        console.log(`${count}건의 데이터 삭제 완료`);
    }
    
    res.sendStatus(204);
}
