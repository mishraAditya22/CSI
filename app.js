const express = require("express");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
var {addAdmin,addStudent,viewStudentDetails,viewAllStudents,adminLogIn} = require("./models/control");
var {deleteStudentRecord,viewAdminDetails,viewAllAdmin,updateTotalMarks} = require("./models/control");
var {studentLogIn} = require("./models/control");
const port = process.env.PORT || 3000 ;

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

function verifyToken(req,res,next){
    //get the auth header value 
    const bearerHeader = req.headers["authorization"];
    //check if bearer is undefined
    if(typeof bearerHeader!=='undefined'){
        //split at the spaces 
        const bearer = bearerHeader.split(" ");
        //get token from array 
        const bearerToken = bearer[1];
        //set the toeken 
        req.token = bearerToken;
        //next middle ware 
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.route("/")
    .get((req,res)=>{
        res.send("MAIN PAGE");
    })

app.route("/Admin/addAdmin")
    .get((req,res)=>{
        res.send("Welcome to Admin entering panel");
    })
    .post((req,res)=>{
        addAdmin({"id":req.body.id,"name":req.body.name,"ph":req.body.ph},res);
    })

app.route("/Admin/addStudent")
    .get((req,res)=>{
        res.send("welcome to Student registering system")
    })
    .post((req,res)=>{
        l = {"id":req.body.id,"name":req.body.name,"ph":req.body.ph,"add":req.body.add,"s1":req.body.s1,"s2":req.body.s2,"s3":req.body.s3} ;
        addStudent(l,res);
    })

app.route("/Admin/viewStudent")
    .get((req,res)=>{
        res.send("WELCOME TO STUDENT DETAIL PORTAL");
    })
    .post(verifyToken,(req,res)=>{
        let name = req.body.name;
        let id = req.body.id;
        jwt.verify(req.token,"secretkey!!.",(err,authData)=>{
            if(err)
                res.sendStatus(403);
            else{
                viewStudentDetails({"name":name,"id":id},res);     
            }
        });
    })

app.route("/Admin/allAdmin")
    .post((req,res)=>{
        viewAllAdmin(res);
    })

app.route("/Admin/viewAllStudents")
    .get((req,res)=>{
        res.redirect("/viewStudent");
    })    
    .post((req,res)=>{
        viewAllStudents(res);
    })

app.route("/Student/studentLogIn")
    .get((req,res)=>{
        res.send("Student login Page");
    })
    .post((req,res)=>{
        studentLogIn({"id":req.body.id},res);
    })

app.route("/Admin/updateMarks")
    .post((req,res)=>{
        updateTotalMarks({"id":req.body.id , "tt" : req.body.tt});
    })

app.route("/Admin/AdminLogin")
    .get((req,res)=>{
        res.send("ADMIN LOGIN PAGE ");
    })
    .post((req,res)=>{
        adminLogIn({"id":req.body.id},res);
    })


app.route("/Admin/deleteStudRecord")
    .get((req,res)=>{
        res.redirect("/viewStudent");
    })    
    .post((req,res)=>{
        deleteStudentRecord(req.body.id,res);
    })

app.listen(port,function(){
    console.log("server is up and running at port no 3000");
})