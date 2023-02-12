class Calculation {
    constructor() {
        this.value = 0;
    }
    
    set(m) {
        if (typeof m !== 'number') {
            throw new TypeError('you must input number type');
        }
        this.value = m;
        return this.value;
    }
    
    add(m) {
        this.value += m;
        return this.value;
    }
    
    subtract(m) {
        this.value -= m;
        return this.value;
    }
    
    multiple(m) {
        this.value *= m;
        return this.value;
    }
    
    devide(m) {
        this.value /= m;
        return this.value;
    }
}

module.exports = Calculation;
