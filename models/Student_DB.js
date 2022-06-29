const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

mongoose.connect('mongodb://localhost:27017/AdminDB');

const studentSchema = new mongoose.Schema({
    userId : {type : String , required : true} ,
    name : String ,
    phone_no : Number ,
    Address : String ,
    sub1 : Number ,
    sub2 : Number ,
    sub3 : Number ,
    total : Number
});


const StudentData = new mongoose.model("StudentData",studentSchema);

module.exports = {StudentData} 