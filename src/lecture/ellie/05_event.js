const EventEmitter = require('events');
const log = console.log;

/**
 * 직접 이벤트를 생성하여 사용할 수 있다.
 * 1. new 이벤트 객체를 생성하고
 * 2. on 이벤트 이름과 함수를 연결한다.
 * 3. emit 이벤트를 발동시킨다.
 * 4. removeListener 이벤트를 삭제한다.
 */

// 이벤트 객체를 생성한다.
const color = new EventEmitter();

// 이벤트 객체에 이벤트와 함수를 연결하여 등록한다.
// 같은 이벤트에 여러개의 함수가 연결될 수 있다.
const blue = (args) => log('A :', args);
color.on('fill', blue);
color.on('fill', args => log('B :', args));

// 이벤트를 발동시킨다.
// 이벤트를 발동시킬 때 인자를 전달할 수 있다.
color.emit('fill', {color: 'red'});
color.emit('fill', {color: 'blue'});

// 특정 이벤트를 삭제한다.
color.removeListener('fill', blue);
color.emit('fill', {color: 'green'});
log();

// EventEmitter 를 상속하여 나만의 이벤트 클래스를 생성할 수 있다.
class Logger extends EventEmitter {
    log(func, msg) {
        this.emit('arg', {msg});
        const ret = func(msg);
        this.emit('ret', {ret});
    }
}

// 이벤트 객체를 생성하고..
const logger = new Logger();
// 이벤트 객체에 이벤트와 함수를 연결하고..
logger.on('arg', args => log(args));
logger.on('ret', args => log(args));

// 나만의 이벤트 객체에 등록된 메서드를 통해 이벤트를 발동시킨다.
logger.log((arg) => {
    log(arg);
    return 'ok';
}, "안녕");
