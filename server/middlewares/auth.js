const model = require('../models');
var jwt = require('jsonwebtoken');
let { Key } = require('../key/keyJWT');
const { users } = model
let accountAuth = async (req, res, next) => {
    console.log('accountAuth')
    const { body } = req;
    const { type } = body;
    let user = {};
    user[type] = body[type]
    let data = await users.findOne({ where: { ...user } });
    if (data) {
        req.user = data;
    }
    next();
}

let tokenAuth = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
    }
    else token = null;
    try {
        var data = jwt.verify(
            token,
            Key,
            {
              ignoreExpiration: true,
            }
          );
          let {id}=data
          let user = await users.findOne({where: {id}});
        if (user) {
            req.user = user;
            next();
        }
        else {
            return res.status(400).send({
                error: true,
                status: 400,
                message: 'account not existed'
            })
        }
    } catch (error) {
        return res.status(500).send({
            error: true,
            status: 500,
            message: 'server error middleware'
        })
    }
}

module.exports = {
    accountAuth, tokenAuth
}