let restApis= require('./restApis');
let datamodels= require('./datamodels'); 
const {sendOk,sendErr}= restApis;
const {requestModel}= datamodels;
module.exports={sendOk,requestModel,sendErr}