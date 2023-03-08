const setError = (status, message, json) => {
    const error = new Error(message);
    error.status = status;
    if (json) error.json = json;
    return error;
}

const raiseError = (status, message, json) => {
    throw setError(status, message, json);
}

module.exports = {
    setError,
    raiseError,
};
