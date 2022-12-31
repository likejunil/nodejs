import {Server} from 'socket.io';
import jwt from "jsonwebtoken";
import config from "../../configure/config.js";

/**
 * socket.io 에 대한 정확한 이해를 하지 못했다.
 * todo 2022.12.31 socket.io 에 대한 study 가 필요함
 */
class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {origin: '*'}
        });
        
        // socket.io 는 다음과 같이 middleware 를 지원함
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('socket.io 인증에 실패했습니다.'));
            }
            
            jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
                if (error) {
                    console.error(`jwt 인증을 실패했습니다.`);
                    return next(new Error('socket.io 인증에 실패했습니다.'));
                }
            });
            
            next();
        });
    }
}

let socket;
export const initSocket = (server) => {
    if (!socket) {
        socket = new Socket(server);
    }
    
    return socket;
}

export const getSocket = () => {
    if (!socket) {
        console.error(`socket.io 가 초기화되지 않음`);
        throw new Error(`socket.io 가 초기화되지 않음`);
    }
    
    return socket.io;
}
