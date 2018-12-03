var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

// tableService.createTableService('users',function()



const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
var books = [
    {name: "Java networking", author: "Hoffsman", handle: "@java", id: 0},
    {name: "Python networking", author: "Pythonman", handle: "@python", id: 1},
    {name: "Nodejs networking", author: "NodeMan", handle: "@node", id:2}
]
*/
var books = [];

var fetchNotes = () => {
  try {
    books = fs.readFileSync('notes-data.json');
    console.log(books);
    return  JSON.parse(books);

  } catch (e) {

    return [];

  }
};

var saveNotes = (books) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(books));
};


var getAll = () => {
  console.log("getting all notes");
  return fetchNotes();
};

app.get("/",function(req,res){
res.render("login.ejs");
});

app.get("/create", function(req,res){
    res.render("create.ejs");
})

app.get("/edit/name/:name/author/:author/handle/:handle/id/:id", function(req,res){
     books =  fetchNotes();
    var data = {
        name: req.params.name,
        author: req.params.author,
        handle: req.params.handle,
        id: req.params.id
    }
    res.render("edit.ejs", {data:data});
})
//Create book
app.post("/create/book",function(req,res){
     books =  fetchNotes();
    var data = {
        name: req.body.name,
        author: req.body.author,
        handle: req.body.handle,
        id: req.body.id
    }
    var newBook = data;
    books.push(newBook);
    saveNotes(books);
    res.render("home.ejs", {data:data, books: books})
})

//delete
app.get("/delete/id/:id", function(req,res){
    books =  fetchNotes();
    for(var i=0; i<books.length;i++){
        if(books[i].id==req.params.id){
            books.splice(i, 1);
        }
    }
    saveNotes(books);
    res.render("home.ejs",{books:books});

})

//Edit boook
app.post("/edit/book",function(req,res){
   books =  fetchNotes();
    var data = {
        name: req.body.name,
        author: req.body.author,
        handle: req.body.handle,
        id: req.body.id
    }

    for(var i=0; i<books.length;i++){
        if(books[i].id==data.id){
            books[i] = data
        }
    }

    console.log(data)
    res.render("home.ejs", {data:data, books: books})
    saveNotes(books);
})

app.post("/authenticate",function(req,res){

    console.log(req.body);
    var data = {
        email:req.body.userEmail,
        password: req.body.userPassword
    }




    if(data.email == 'testuser@email.com' && data.password == 'testpassword'){
         books =  fetchNotes();
        res.render("home.ejs", {data: data, books: books});



    }
    else{
        res.render("failure.ejs");
    }
});

app.get("/books/new", function(req,res){
    res.render("new");
})



app.listen(port, function(){
    console.log("Serving applicaiton on port 3000");
});
