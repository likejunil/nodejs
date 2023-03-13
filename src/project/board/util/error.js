const setError = (status, message, data) => {
    const error = new Error(message);
    error.status = status;
    if (data) error.data = data;
    return error;
}

const raiseError = (status, message, json) => {
    throw setError(status, message, json);
}

module.exports = {
    setError,
    raiseError,
};
