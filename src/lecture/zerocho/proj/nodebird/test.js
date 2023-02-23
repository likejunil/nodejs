
const input = '도대체 가자 여의도 일을 어떻게 열심 하는건지..';

const ret = input.match(/ #[^\s#]*/g);
console.log(ret);