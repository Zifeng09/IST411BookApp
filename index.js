var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.render("login.ejs");
});

app.post("/authenticate",function(req,res){
    console.log(req.body);
    var data = {
        email:req.body.userEmail,
        password: req.body.userPassword
    }
    if(data.email == 'testuser@email.com' && data.password == 'testpassword'){
        res.render("home.ejs");
    }
    else{
        res.render("failure.ejs");
    }
});

app.listen(port, function(){
    console.log("Serving applicaiton on port 8000");
});






