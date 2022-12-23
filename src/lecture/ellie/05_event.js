const EventEmitter = require('events');

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
const blue = (args) => console.log('blue :', args);
color.on('fill', blue);
color.on('fill', args => console.log('any :', args));

// 이벤트를 발동시킨다.
// 이벤트를 발동시킬 때 인자를 전달할 수 있다.
color.emit('fill', {color: 'red'});
color.emit('fill', {color: 'blue'});

// 특정 이벤트를 삭제한다.
color.removeListener('fill', blue);
color.emit('fill', {color: 'green'});
console.log();

// EventEmitter 를 상속하여 나만의 이벤트 클래스를 생성할 수 있다.
class Logger extends EventEmitter {
    log(func) {
        this.emit('start', {name: func.name});
        const ret = func();
        this.emit('finish', {ret});
    }
}

// 이벤트 객체를 생성하고..
const logger = new Logger();
// 이벤트 객체에 이벤트와 함수를 연결하고..
logger.on('start', args => console.log(args));
logger.on('finish', args => console.log(args));

// 나만의 이벤트 객체에 등록된 메서드를 통해 이벤트를 발동시킨다.
logger.log(function func() {
    console.log('작업 완료~!');
    return 'ok';
});
