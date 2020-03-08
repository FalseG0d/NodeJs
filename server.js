const express=require("express");
//Express Errors
require("express-async-errors")
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const morgan=require("morgan")

//Connect To DB
require("./mongo")

//Models
require("./model/Post")

//Middleware
app.use(bodyParser.json())
    .use(morgan())


//Routes
app.use("/posts",require("./routes/posts"))

//Middleware for Error Handling
app.use((req,res,next)=>{
    req.status=404;
    const error=new Error("Routes Not Found");
    next(error);
});

//Error Handler
app.use((error,req,res,next)=>{
    res.status(req.status||500).send({
        message:error.message,
        stack:error.stack
    });
});

//Test PostMan
app.get("/post",(request,response)=>{
    response.send({
        name:"Apoorv"
    })
})

//Dummy Console Check
app.listen(7777,function(){
    console.log("Server Running at port 7777");
});