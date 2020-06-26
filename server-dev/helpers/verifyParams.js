const verifyParams = (params) => {
    for (const key in params) {
        if(!params[key]){
            return [false, `No envió el ${key}`]
        }
    }
    return [true]
};

export default verifyParams;