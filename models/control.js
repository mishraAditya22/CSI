var {AdminData} = require("./Admin_DB");
var {StudentData} = require("./Student_DB");
const jwt = require("jsonwebtoken");
var {TokenData} = require("./token");
var bodyparser = require("body-parser");

let genrate = (user)=>{
    jwt.sign({user:user},"secretkey!!.",(err,token)=>{
        return {token : token};
    });
}

let addAdmin = (o,res)=>{
    const user = new AdminData({
        name : o.name ,
        id : o.id ,
        phone_no : o.ph,
        token : "aditya" 
    });
    user.save();
    let gen = genrate(user);
    AdminData.findOneAndUpdate({id:o.id},{token:gen},(err)=>{
        if(err)
            console.log(err);
        else
            res.send("sucessfully inserted data ")
    })
    // user.save((err)=>{
    //     if(!err)
    //         res.send("sucessfully inserted data ");
    //     else
    //         res.send(err);
    // });

};

let addStudent = (l,res)=>{
    const student = new StudentData({
        userId : l.id ,
        name : l.name ,
        phone_no : l.ph ,
        Address : l.add ,
        sub1 : l.s1 ,
        sub2 : l.s2 ,
        sub3 : l.s3 ,
        total : l.s1 + l.s2 + l.s3
    });

    student.save((err)=>{
        if(!err)
            res.send("sucessfully inserted");
        else
            res.send(err);
    });
};

let viewStudentDetails = (o,res)=>{
    let Sname = o.name;
    let sid = o.id ;

    StudentData.findOne({userId : sid},(err,foundStudent)=>{
        if(err)
            res.send(err);
        else if(foundStudent){
            if(foundStudent.name===Sname){
                for (let [key, value] of Object.entries(foundStudent)) {
                    console.log(key, value);
                }
                res.json(foundStudent);
            }
        }
    });
};

let viewAdminDetails = (o,res)=>{
    let Sname = o.name;
    let sid = o.id ;

    AdminData.findOne({userId : sid},(err,foundAdmin)=>{
        if(err)
            res.send(err);
        else{
            if(foundAdmin.name===Sname){
                for (let [key, value] of Object.entries(foundAdmin)) {
                    console.log(key, value);
                }
                res.send(foundAdmin);
            }
        }
    });
};

let viewAllStudents = (res)=>{
    StudentData.find({},(err,result)=>{
        if(err)
            res.send(err);
        else{
            for (let [key, value] of Object.entries(result)) {
                console.log(key, value);
            }
            res.send(result);
        }
    });
};

let deleteStudentRecord = (sid,res)=>{
    StudentData.deleteOne({userID : sid},(err)=>{
        if(err)
            res.send(err);
        else
            res.send("delete Sucessfully");
    });
};

let viewAllAdmin = (res)=>{
    AdminData.find({},(err,result)=>{
        if(err)
            res.send(err);
        else{
            // for (let [key, value] of Object.entries(result)) {
            //     console.log(key, value);
            // }
            res.json(result);
        }
    });
};

let updateTotalMarks = (o,res)=>{
    StudentData.updateOne({userID : o.id},{total : o.tt},(err)=>{
        if(!err)
            res.send("sucessfully updated");
        else
            res.send(err);
    })
};

let adminLogIn = (o,res)=>{
    AdminData.findOne({id:o.id},(err,result)=>{
          
        if(result){    
            //res.send("Welcome "  + result.name);
            // jwt.sign({user:o},"secretkey!!.",(err,token)=>{
            //     store.push(token);
            //     res.json({token : token});
            // });
        }
        else if(!result)
            res.sendStatus(403);
        else if(err){
            res.send(err);
        }
    });
};

let studentLogIn = (o,res)=>{
    StudentData.findOne({"userId":o.id},(err,result)=>{
        if(err)
            res.send(err);
        if(result){
            res.send("Welcome "  + result.name);
            console.log("Logged You in!!");
        }
        else
            res.send("User Not Found!!");
    })
};

module.exports = {addAdmin,addStudent,viewStudentDetails,viewAllStudents,deleteStudentRecord,viewAdminDetails,viewAllAdmin,updateTotalMarks,adminLogIn,studentLogIn} ;