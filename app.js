const express = require("express");
require('dotenv').config();
const userRouter = require("./api/users/user.router");
var bodyParse = require('body-parser');

const app = express();
app.use(bodyParse.urlencoded({extended : true}));
app.use(bodyParse.json());

app.use("/api/users", userRouter);

app.get("/api", (req, res)=>{
    res.json({status : true, "message" : "Howdy, welcome to user mgt/autentication in node js"});
})

app.listen(process.env.PORT, ()=>{
    console.log("App is working..... PORT : " + process.env.PORT)
})