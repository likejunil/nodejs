const lazy = (color) => {
    if (color === 'black') return Promise.reject('보이지 않는 색');
    else return Promise.resolve({name: color});
}

module.exports = {
    lazy
};
