var express=require('express');
var router=require('./routes')
var bodyParser = require('body-parser');
var app=express();//server creation
app.use(bodyParser.json())//to parse into json
app.use(function (req, res, next) {

    console.log("Iam app level middleware");

    req.appUse="app level middleware change"
     next();
});

app.listen(3000)//portno.
app.use(router)//routes
console.log('Listening');

