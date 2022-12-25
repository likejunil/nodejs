import * as repository from '../repository/tweetsRepo.js';

export async function getList(req, res, next) {
    const userId = req.query.userId;
    const ret = await (userId //
        ? repository.findByUserId(userId) //
        : repository.findAll());
    res.status(200).json(ret);
}

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

export async function create(req, res, next) {
    const {id} = req.user;
    const {text} = req.body;
    const ret = await repository.create(id, text);
    res.status(201).json(ret);
}

export async function update(req, res, next) {
    const userId = req.user.id;
    const tweetId = req.params.id;
    const text = req.body.text;
    
    const find = await repository.findById(tweetId);
    if (!find) {
        return res.status(404).json({message: '해당 tweet 이 존재하지 않습니다.'});
    }
    if (find.userId !== userId) {
        return res.status(403).json({message: '해당 tweet 을 수정할 권한이 없습니다.'});
    }
    
    find.text = text;
    const ret = await repository.update(find);
    if (ret) {
        res.status(200).json(ret);
    } else {
        res.status(404).json({
            message: `해당 id(${tweetId})의 데이터를 찾을 수 없습니다.`,
        });
    }
}

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
