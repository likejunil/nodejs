const log = console.log;

const input = '133abdd34';
log(input.match(/\d/));
log(input.match(/\d+/));

log(input.match(/(?=.*b)/));
