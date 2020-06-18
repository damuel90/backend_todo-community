const showError = (status, message) => {
    let error = new Error();
    error.status = status;
    error.message = message;

    return error;
};

export default showError;