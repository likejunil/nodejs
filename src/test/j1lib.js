const strdate = (format) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getMonth()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeStr = `${hours}:${minutes}:${seconds}`;
    
    return format
        ? format
            .replace('%Y', year)
            .replace('%m', month)
            .replace('%d', day)
            .replace('%H', hours)
            .replace('%M', minutes)
            .replace('%S', seconds)
        : `${dateStr} ${timeStr}`;
};

const format = '%Y-%m-%d %H:%M:%S';
console.log(strdate(format));

const fill = (target, digit, fill = '0', dir = 'start') => {
    const type = typeof (target);
    if (type !== 'string' && type !== 'number')
        return target;
    else if (type === 'number')
        target = target.toString()
    
    try {
        if (dir === 'start') {
            return target.padStart(digit, fill);
        } else if (dir === 'end') {
            return target.padEnd(digit, fill);
        } else {
            return target;
        }
    } catch (err) {
        console.error(err.message);
        return target;
    }
};


module.exports = {
    fill,
};