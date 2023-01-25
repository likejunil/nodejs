const log = console.log;

const test_promise = () => {
    const n = 10;
    Promise.resolve(n)
        .then(res => {
            log(res);
            return res * 10;
        })
        .then(res => {
            log(res);
            return Promise.resolve(res * 10);
        })
        .then(res => {
            log(res);
            const ret = Promise.reject('error');
            log('여기를 통과할 수 있을까?');
            return ret;
        })
        .then(res => {
            log(res);
            return "사과";
        })
        .then(res => {
            log(res);
        })
        .catch(log);
};

test_promise();
