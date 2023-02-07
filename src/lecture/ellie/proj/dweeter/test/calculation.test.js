/* jest 는 export, import 를 지원하지 않는다. */
const Calculation = require('./calculation.js');

function add(a, b) {
    return a + b;
}

describe('add', () => {
    test('add(1, 2)', () => {
        expect(add(1, 2)).toBe(3);
    });
})

describe('calculation', () => {
    let calc;
    beforeEach(() => {
        calc = new Calculation();
    });
    
    it('init', () => {
        expect(calc.value).toBe(0);
    });
    
    it('set', () => {
        const m = 9;
        expect(calc.set(m)).toBe(m);
    });
    
    it('set error', () => {
        expect(() => {
            calc.set('apple')
            // }).toThrow();
            // }).toThrow(Error);
            // }).toThrow(TypeError);
        }).toThrow('you must input number type');
    })
    
    it('add', () => {
        const a = 9;
        const b = 10;
        calc.set(a);
        expect(calc.add(b)).toBe(a + b);
    });
    
    it('subtract', () => {
        const a = 10;
        const b = 8;
        calc.set(a);
        expect(calc.subtract(b)).toBe(a - b);
    });
    
    it('multiple', () => {
        const a = 3;
        const b = 7;
        calc.set(a);
        expect(calc.multiple(b)).toBe(a * b);
    });
    
    describe('devide', () => {
        it('0 / 0', () => {
            calc.set(0);
            expect(calc.devide(0)).toBe(NaN);
        });
        
        it('1 / 0', () => {
            calc.set(1);
            expect(calc.devide(0)).toBe(Infinity);
        });
        
        it('normal', () => {
            const a = 10;
            const b = 2;
            calc.set(10);
            expect(calc.devide(b)).toBe(a / b);
        });
    });
});
