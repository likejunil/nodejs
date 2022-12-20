function outer() {
    const obj = {name: '준일', age: 48,};
    
    function getName() {
        return obj.name;
    }
    
    function getAge() {
        return obj.age;
    }
    
    function getYear() {
        obj.age += 1;
    }
    
    const ret = {
        color: 'red',
        getName,
        getAge,
        getYear,
        getColor: () => ret.color,
        setColor: (color) => ret.color = color,
    };
    
    return ret;
}

const func1 = outer();
console.log(func1.getName());
console.log(func1.getAge());
func1.getYear();
console.log(func1.getAge());
console.log(func1.getColor());
func1.setColor('blue');
console.log(func1.getColor());

const func2 = outer();
console.log(func2.getName());
console.log(func2.getAge());
func2.getYear();
console.log(func2.getAge());
console.log(func2.getColor());
