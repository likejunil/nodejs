const EventEmitter = require('events');

const emitter = new EventEmitter();
const func = (args) => console.log('2:', args);
emitter.on('hi', args => console.log('1:', args));
emitter.on('hi', func);

emitter.emit('hi', {color: 'red'});
emitter.emit('hi', {color: 'blue'});
emitter.removeListener('hi', func);
emitter.emit('hi', {color: 'green'});

class Logger extends EventEmitter {
    log(func) {
        this.emit('log', {animal: 'cat'});
        func();
        this.emit('log', {animal: 'dog'});
    }
}

const logger = new Logger();
logger.on('log', args => console.log(args));
logger.log(() => console.log('작업 진행'));
