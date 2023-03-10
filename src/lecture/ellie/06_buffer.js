const log = console.log;
const encoding = 'utf8';

/**
 * 1. Buffer 객체는 global 의 속성이다.
 *
 * 2. Buffer 를 만든다.
 *   - buff = Buffer.from(string, data);
 *   - buff = Buffer.alloc(size, fill);
 *   - buff = Buffer.allocUnsafe(size);
 *
 * 3. Buffer 를 조작하고 읽는다.
 *   - buff.write(string, offset, length, encoding?);
 *   - buff.toString(encoding?, start?, end?);
 *   - buff1.copy(buff2); // buff1 의 내용을 buff2 에 복사한다.
 *   - buff = Buffer.concat([buff1, buff2, ..]);
 *
 * 4. Buffer 는 기본적으로 문자를 "utf8" 으로 인코딩한다.
 * 5. Buffer 의 길이는 바이트 기준이다.
 */

log('global.Buffer === Buffer :', Buffer === global.Buffer);

const l = (t, d) => {
    log(`${t} => 길이:${d.length}, 내용:[${d}], 바이트-첫글자=[${d[0]}], ` +
        `문자-두글자=[${d.toString(encoding, 0, 6)}]`);
};

// 데이터로부터 버퍼 생성하기
const buf1 = Buffer.from("쌀밥", encoding);
l('buf1', buf1);

// 버퍼 공간을 할당하면서 초기화하기
const buf2 = Buffer.alloc(7, '국밥1');
l('buf2', buf2);

// 버퍼에 인덱스를 활용하여 데이터를 주입할 때는 문자를 입력할 수 없다.
// 반드시 숫자여야 한다.
const buf3 = Buffer.alloc(7, '초밥');
// buf3[6] = "1"; <= 문자 1이 숫자 1으로 자동 변환된다.
buf3[6] = 0x33;
l('buf3', buf3);

// 초기화 없이 빠르게 버퍼 생성하기 (쓰레기 값이 들어있을 수 있음)
// 버퍼의 내용을 복사하기
const buf4 = Buffer.allocUnsafe(3);
buf3.copy(buf4);
l('buf4', buf4);

// 버퍼들을 합치기
const buf5 = Buffer.concat([buf1, buf2, buf3, buf4]);
log(`buf5 => ${buf5.toString(encoding)}`);
log(buf5.toString(encoding, 3, 9));
buf5.write('순대만세', 0, 6, encoding);
l('buf5', buf5);
