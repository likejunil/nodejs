const strftime = (format, date) => {
    if (!date) date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getMonth()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;
    
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const milli = date.getMilliseconds();
    const timeStr = `${hours}:${minutes}:${seconds}`;
    
    return format
        ? format
            .replaceAll('%Y', year)
            .replaceAll('%ms', milli)
            .replaceAll('%m', month)
            .replaceAll('%d', day)
            .replaceAll('%H', hours)
            .replaceAll('%M', minutes)
            .replaceAll('%S', seconds)
        : `${dateStr} ${timeStr}`;
};

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

const j1 = {
    fill,
    strftime,
};

export default j1;
