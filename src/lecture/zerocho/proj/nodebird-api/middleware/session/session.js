const LOG = false;
const log = LOG ? console.log : () => {
};

const session = (req, res, next) => {
    log('<< 세션 내용 >>');
    log(req.session);
    
    /* 세션에 데이터를 저장하는 순간, 세션키('connect.sid')를 쿠키에 저장하여 client 에게 보낸다. */
    log('<< 세션 기록 >>');
    req.session.data = {
        color: 'blue',
        planet: 'earth',
        animal: 'cat',
        size: 'small',
    };
    
    next();
}

module.exports = session;
