const model= require('../models');
var jwt = require('jsonwebtoken');
let { Key } = require('../key/keyJWT');
let checkEmail= async (email)=>{
    let Data = await model.user.findOne({where: {email: email}});
    if(Data){
        return true;
    }
    else return false;
}
let checkToken= async (token)=>{
    try {
        var data = jwt.verify(
          token,
          Key,
          {
            ignoreExpiration: true,
          }
        );
        let {id}=data
        let Data = await model.user.findOne({where: {id}});
        if(Data){
            return Data;
        }
        else return false;
        
    }
    catch{
        return false;
    }
}
let existedNameTable= async (name)=>{
    let Data = await model.table.findOne({where: {name: name}});
    if(Data){
        return Data;
    }
    else return false;
}
let checkDataEmail= async (email)=>{
    let Data = await model.user.findOne({where: {email: email}});
    if(Data){
        return Data;
    }
    else return false;
}
module.exports={
    checkEmail,
    existedNameTable,
    checkDataEmail,
    checkToken
}