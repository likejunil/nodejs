import {id} from '../util/unique.js';
import * as authRepository from './authRepo.js';

const ID_LEN = 8;

// 메모리 데이터베이스
let data = [];

export async function findAll() {
    return Promise.all(
        data.map(async m => {
            const {id, username, name} = await authRepository.findById(m.userId);
            return {
                ...m,
                userId: id,
                username,
                name,
            };
        })
    );
}

export async function findByUserId(userId) {
    const {username, name} = await authRepository.findById(userId);
    const find = data.filter(m => m.userId === userId);
    return {
        ...find,
        userId,
        username,
        name,
    };
}

export async function findById(id) {
    const find = data.find(m => m.id === id);
    if (!find) {
        return null;
    }
    
    const {username, name} = await authRepository.findById(find.userId);
    return {
        ...find,
        userId: find.userId,
        username,
        name,
    };
}

export async function update(tweet) {
    const {id, text} = tweet;
    const find = data.find(m => m.id === id);
    if (!find) {
        return null;
    }
    
    find.text = text;
    const {username, name} = await authRepository.findById(find.userId);
    return {
        ...find,
        userId: find.userId,
        username,
        name,
    };
}

export async function create(userId, value) {
    const one = {
        id: id(ID_LEN),
        text: value,
        createAt: Date.now().toString(),
        userId,
    };
    data = [one, ...data];
    return one;
}

export async function remove(id) {
    data = data.filter(m => m.id !== id);
}