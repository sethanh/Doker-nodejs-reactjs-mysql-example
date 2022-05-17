let {checkEmail,existedNameTable,checkDataEmail,checkToken}= require('../authServive/authService');
let CheckHeaders = async (req ,res,next)=>{
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
      } 
    else token = null;
    try {
        let user = await checkToken(token);
        if(user){
            req.user=user;
            next();
        }
        else{
            return res.status(400).send({
                error:true,
                status: 400,
                message:'account not existed'
            })
        }  
    } catch (error) {
        return res.status(500).send({
            error:true,
            status: 500,
            message:'server error middleware'
        })
    }
}
let isEmail = async (req ,res,next)=>{
    let {email}= req.body;
    try {
        let user = await checkEmail(email);
        if(!user){
           next();
        }
        else{
            return res.status(400).send({
                error:true,
                status: 400,
                message:'account existed'
            })
        }  
    } catch (error) {
        return res.status(500).send({
            error:true,
            status: 500,
            message:'server error middleware'
        })
    }
}
let CheckAccount = async (req ,res,next)=>{
    let {email}= req.body;
    try {
        let user = await checkDataEmail(email);
        if(user){
           req.user=user;
           next();
        }
        else{
            return res.status(400).send({
                error:true,
                status: 400,
                message:'Không tồn tại tài khoản'
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            error:true,
            status: 500,
            message:'server error'
        })
    }
}
let CheckNameTable = async (req ,res,next)=>{
    let {name}= req.body;
    try {
        let user = await existedNameTable(name);
        if(!user){
           next();
        }
        else{
            return res.status(400).send({
                error:true,
                status: 400,
                message:`Đã tồn tại bảng ${name}`
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            error:true,
            status: 500,
            message:'server error'
        })
    }
}
module.exports={
    isEmail,CheckAccount,CheckNameTable,CheckHeaders
}