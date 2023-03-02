const setError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

const raiseError = (status, message) => {
    throw setError(status, message);
}

module.exports = {
    setError,
    raiseError,
};
