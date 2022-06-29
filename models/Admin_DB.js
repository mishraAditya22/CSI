const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

mongoose.connect('mongodb://localhost:27017/AdminDB');

const AdminSchema = new mongoose.Schema({
    name : String ,
    id : {type : String , required : true} ,
    phone_no : Number,
    token : {type : String , required:true}
});

const AdminData = new mongoose.model("AdminData",AdminSchema);

module.exports = {AdminData} 