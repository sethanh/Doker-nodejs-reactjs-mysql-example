let sendOk = async (body) => {
    const {status}=body
    const {res,...data}= body
    return res.status(status).send({
       ...data
    });
};
let sendErr = async (body) => {
    const {status}=body
    const {res,...data}= body
    return res.status(status).send({
       ...data,
       err: true
    });
};

module.exports = { sendOk,sendErr };