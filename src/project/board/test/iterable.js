const log = console.log;

const own = obj => {
    log("**************************************");
    log("for in 정보:");
    for (const m in obj) {
        log(`${m}: ${obj[m]}`);
    }
    log("**************************************");
}

const f1 = () => {
    const l = [1, 2, 3, 4];
    const o = {'a': 1, 'b': 2, 'c': 3, 'd': 4};
    
    /* 파이썬에서는 기본적으로 in 으로 사용 */
    /* 자바스크립트에서 순회하기 위해 of 사용 */
    /* 객체의 요소 key 값은 in 으로 순회 */
    log("배열에서 of 사용");
    for (const m of l) {
        log(`${m}`);
    }
    
    log("배열에서 in 사용");
    for (const m in l) {
        log(`${m}: ${l[m]}`);
    }
    
    /* 불가 */
    /*
    log("객체에서 of 사용");
    for (const m of o) {
        log(`${m}: ${l[m]}`);
    }
     */
    
    log("객체에서 in 사용");
    for (const m in o) {
        log(`${m}: ${o[m]}`);
    }
}

const f2 = () => {
    class Parent {
        static sta = 3;
        pub1 = 1;
        #pri = 2;
        
        constructor(pub2) {
            this.pub2 = pub2;
        }
        
        static getSta() {
            return Parent.sta;
        }
        
        getPri() {
            return this.#pri;
        }
        
        #getPub1() {
            return this.pub1;
        }
    }
    
    const parent = new Parent(4);
    log("Parent 의 객체를 생성했습니다.");
    /* static 은 Parent 의 property 이다. */
    /* method 들은 모두 (constructor 포함) Parent.prototype 의 property 로 존재한다. */
    /* private 들은 Parent, Parent.prototype 에도 존재하지 않는다. */
    log("Parent:", Object.getOwnPropertyDescriptors(Parent));
    log("parent:", Object.getOwnPropertyDescriptors(parent));
    log("Parent.prototype:", Object.getOwnPropertyDescriptors(Parent.prototype));
    
    /* private property 는 for in 으로 순회할 수 없다. */
    own(parent);
    /* private property 는 심지어 getOwnPropertyDescriptor() 로도 접근이 불가능하다. */
    log(Object.getOwnPropertyDescriptor(parent, '#pri'));
    /* private property 는 심지어 hasOwnProperty() 로도 접근이 불가능하다. */
    log(parent.hasOwnProperty('#pri'));
    
    class Child extends Parent {
        pub3 = 5;
        
        constructor(pub2, pub4) {
            super(pub2);
            this.pub4 = pub4;
        }
        
        getPub3() {
            return this.pub3;
        }
    }
    
    log("Child 의 객체를 생성했습니다.");
    const child = new Child(4, 6);
    log("Child:", Object.getOwnPropertyDescriptors(Child));
    log("child:", Object.getOwnPropertyDescriptors(child));
    log("Child.prototype:", Object.getOwnPropertyDescriptors(Child.prototype));
    own(child);
}

/* for ... in 은 상속된 속성들까지 모두 조회한다. */
/* 단, 열거 가능 속성이 true 이어야만 한다. */
/* Symbol 키가 지정된 속성은 무시한다. */

// f1();
// f2();
f3();
