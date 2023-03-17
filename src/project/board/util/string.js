const camel2snake = (s) => s && s.trim().split(/(?=[A-Z])/).join('_').toLowerCase();

module.exports = {
    camel2snake,
};
