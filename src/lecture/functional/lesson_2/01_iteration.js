const f1 = () => {
    console.log('<< array 배열 >>');
    const array = ['a', 'b', 'c'];
    console.table(array);
    console.log('array 배열 =>', array);
    
    console.log();
    console.log('<< "0" in array >>');
    if ('0' in array) {
        console.log('array 배열에는 "0" 이 있다.');
        console.log('array[0] =>', array[0]);
        console.log('array["0"] =>', array["0"]);
    }
    
    console.log();
    console.log('<< "a" in array >>');
    if ('a' in array) {
        console.log('array 배열에는 "a" 이 있다.');
    } else {
        console.log('array 배열에는 "a" 이 없다.');
    }
    
    console.log();
    console.log('array.length =>', array.length);
    console.log('array["length"] =>', array["length"]);
    console.log('<< "length" in array >>');
    if ('length' in array) {
        console.log('array 배열에는 "length" 이 있다.');
    } else {
        console.log('array 배열에는 "length" 이 없다.');
    }
    
    console.log();
    console.log('Symbol.iterator =>', Symbol.iterator);
    console.log('array[Symbol.iterator] =>', array[Symbol.iterator]);
    console.log('array["Symbol.iterator"] =>', array["Symbol.iterator"]);
    console.log('Symbol.iterator === Symbol.iterator =>', Symbol.iterator === Symbol.iterator);
    console.log('<< Symbol.iterator in array >>');
    if (Symbol.iterator in array) {
        console.log('array 배열에는 Symbol.iterator 이 있다.');
    } else {
        console.log('array 배열에는 Symbol.iterator 이 없다.');
    }
    
    console.log();
    console.log('for of 사용(access value)');
    for (const m of array) {
        console.log(m);
    }
    console.log('for in 사용(access key)');
    for (const m in array) {
        console.log(m, array[m]);
    }
    console.log('Object.keys(array) =>', Object.keys(array));
    
    console.log();
    const iterator = array[Symbol.iterator]();
    while (true) {
        const ret = iterator.next();
        console.log(ret);
        if (ret.done) break;
    }
    
    console.log();
    console.log('array[Symbol.iterator] = null');
    array[Symbol.iterator] = null;
    console.log('for in 사용(access key)');
    for (const m in array) {
        console.log(m, array[m]);
    }
    
    try {
        console.log('for of 사용(access value)');
        for (const m of array) {
            console.log(m);
        }
    } catch (e) {
        console.error('에러 메시지 =>', e.message);
    }
};

const f2 = () => {
    const plus = "add";
    const iterable = {
        [plus]: (a, b) => a + b,
        
        // well-formed iterator
        [Symbol.iterator]: () => {
            let i = 3;
            return {
                next: () => {
                    return i === 0
                        ? {done: true}
                        : {value: i--, done: false};
                },
                
                [Symbol.iterator]() {
                    return this;
                },
            };
        },
    };
    
    console.log('iterable =>', iterable);
    const iter1 = iterable[Symbol.iterator]();
    console.log('iterator =>', iter1);
    console.log(iter1.next());
    console.log(iter1.next());
    console.log(iter1.next());
    console.log(iter1.next());
    for (const m of iterable) {
        console.log(m);
    }
    
    console.log();
    const iter2 = iterable[Symbol.iterator]();
    console.log(iter2.next());
    for (const m of iter2) {
        console.log(m);
    }
    
    console.log();
    console.log(iterable["add"](1, 2));
    console.log(iterable[plus](3, 4));
};

const f3 = () => {
    // generator 는 iterator 를 만드는 함수이다.
    function* generator() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        return 5;
    }
    
    for (const m of generator())
        console.log(m);
    
    const iter1 = generator();
    console.log(iter1.next());
    for (const m of iter1)
        console.log(m);
    console.log(iter1.next());
    
    const iter2 = generator();
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
};

// f1();
// f2();
f3();