// 1. 데이터로부터 버퍼 생성하기
const buf1 = Buffer.from("hi");
console.log(buf1);
console.log(buf1.length);
for (let i = 0; i < buf1.length; i++) {
    console.log(buf1[i]);
}
console.log(buf1.toString('utf-8'));

// 2. 버퍼 공간을 할당하면서 초기화하기
const buf2 = Buffer.alloc(2, 104);
buf2[1] = 105;
for (const m of buf2) {
    console.log(m);
}
console.log(buf2.toString());

// 3. 초기화 없이 빠르게 버퍼 생성하기
// 쓰레기 값이 들어있을 수 있음
// 4. 버퍼의 내용을 복사하기
const buf3 = Buffer.allocUnsafe(2);
buf2.copy(buf3);
console.log(buf3.toString());

// 5. 버퍼들을 합치기
const buf4 = Buffer.concat([buf1, buf2, buf3]);
console.log(buf4.toString());
