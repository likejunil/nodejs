const raiseError = (status, message) => {
    const e = new Error(message);
    e.status = status;
    throw e;
}

module.exports = {
    raiseError,
};
