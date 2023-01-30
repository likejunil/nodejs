const log = console.log;

// 객체 생성
class Person {
    // static property
    // 반드시 Person(클래스명)으로 접근해야 한다.
    static population = 0;
    
    // private property
    // 반드시 여기(enclosing class)에 선언해야 한다.
    #money;
    
    // public property
    // 일반적으로 constructor() 안에 선언한다.
    // 여기에도 선언할 수 있다.
    lastname;
    firstname;
    
    // 생성자 함수
    // 오직 하나만 선언할 수 있다.
    // 생략하면 저절로 비어있는 생성자 함수가 생성된다.
    constructor() {
        this.age = 0;
        this.#money = 0;
        Person.population += 1;
    }
    
    // accessor property getter
    get fullname() {
        return `${this.lastname} ${this.firstname}`;
    }
    
    // accessor property setter
    set fullname(fullname) {
        [this.lastname, this.firstname] = fullname.split(' ');
    }
    
    // static method
    static info() {
        console.log('현재 인구수:', this.population);
    }
    
    // private method
    #secretMethod() {
        console.log('#secretMethod(): 외부에서 직접 나를 호출할 수 없다.');
    }
    
    // instance method
    accessMethod() {
        this.#secretMethod();
        console.log('accessMethod(): 그래서 제가 대신 접근합니다.')
    }
    
    spendMoney(amount) {
        this.#money -= amount;
        return this;
    }
    
    earnMoney(amount) {
        this.#money += amount;
        return this;
    }
    
    getMoney() {
        return this.#money;
    }
    
    getOld() {
        this.age += 1;
        return this;
    }
    
    getAge() {
        return this.age;
    }
}

// 객체 생성
const june = new Person();

// static
log(Person.population);
Person.info();

// accessor property 사용
june.fullname = '권 준일';
log(june.fullname);

// public method 를 통해 private 에 접근
june.accessMethod();
log(june.earnMoney(1_000)
    .spendMoney(2_000)
    .getMoney());

// instance method 사용
log(june.getOld()
    .getOld()
    .getAge());

// 클래스도 함수다.
// name, length, prototype property 를 갖고 있다.
// 그리고 static 요소를 갖고 있다.
console.table(Object.getOwnPropertyDescriptors(Person));

// 모든 method 는 모두 prototype 의 property 로 등록된다.
// accessor property 도 마찬가지다. (method 취급)
console.table(Object.getOwnPropertyDescriptors(Person.prototype));

// 순수한 instance property 만 own property 로 다룬다.
// private 은 도대체 어디에?..
console.table(Object.getOwnPropertyDescriptors(june));


// 상속
class Student extends Person {
    constructor(major) {
        // 반드시 super() 를 호출해야 this 를 사용할 수 있다.
        // 부모가 빈 객체를 생성하여 this 를 바인딩 해주기 때문이다.
        super();
        this.major = major;
    }
}

log('<< 상속을 받았습니다. >>')
const student = new Student('math');

// parent's static
Student.info();
// parent's accessor property setter
student.fullname = '권 수학';
// parent's accessor property getter
log(student.fullname);
// parent's public 을 통한 private 접근
student.accessMethod();
log(student.earnMoney(100).getMoney());
// parent's property
log(student.getOld().age);
// hasOwnProperty
log(student.major);

// 부모에게서 상속받은 모든 property 가 own property 가 되었다.
console.table(Object.getOwnPropertyDescriptors(Student));
console.table(Object.getOwnPropertyDescriptors(Student.prototype));
console.table(Object.getOwnPropertyDescriptors(student));
