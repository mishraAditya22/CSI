const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/AdminDB');

const forAuthSchema = new mongoose.Schema({
    userID : {type:String , required : true} ,
    userType : {type : String , required : true},
    Token : {type:String , required : true}
}); 

const TokenData = new mongoose.model("TokenData",forAuthSchema) ;

module.exports = {TokenData};
