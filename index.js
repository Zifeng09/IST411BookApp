var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

// tableService.createTableService('users',function()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var books = [
    {name: "Java networking", author: "Hoffsman", handle: "@java", id: 0},
    {name: "Python networking", author: "Pythonman", handle: "@python", id: 1},
    {name: "Nodejs networking", author: "NodeMan", handle: "@node", id:2}
]


app.get("/",function(req,res){
res.render("login.ejs");
});

app.get("/create", function(req,res){
    res.render("create.ejs");
})

app.post("/create/book",function(req,res){
    var data = {
        name: req.body.name,
        author: req.body.author,
        handle: req.body.handle,
        id: req.body.id
    }
    var newBook = data;
    books.push(newBook);
    res.render("home.ejs", {data:data, books: books})
})
app.post("/authenticate",function(req,res){

    console.log(req.body);
    var data = {
        email:req.body.userEmail,
        password: req.body.userPassword
    }

    


    if(data.email == 'testuser@email.com' && data.password == 'testpassword'){
        res.render("home.ejs", {data: data, books: books});
    }
    else{
        res.render("failure.ejs");
    }
});

app.get("/books/new", function(req,res){
    res.render("new");
})

app.post("/books", function(req,res){

})

app.listen(port, function(){
    console.log("Serving applicaiton on port 3000");
});






