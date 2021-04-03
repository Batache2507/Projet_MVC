//import express 
const { request, response } = require('express');
let express = require('express'); 

//initialize the app 
let app = express();

//permet de traiter le body
app.use(express.urlencoded({extended:true})); 

//connection avec serveur 
var mysql = require("mysql");
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'root',
    database    : 'users'
});
    connection.connect(function(error) { if (error) console.log(error);});


//display message for default URL
app.get('/', function(request, response) {
    response.send('Hello Bat');
});

//send list of users 
app.get('/user', function (request, response) {
    connection.query("SELECT * FROM user;", function(error, result) {
        if (error) console(error);
        response.render('userList.ejs', {users: result});
    });
});

//add a user with form
app.get('/user/add', function(request, response) {
    response.render("userAdd.ejs");
});

app.post('/user', function (request, response) {
    let user  = {"first_name":request.body.first_name, "last_name":request.body.last_name};
    connection.query("INSERT INTO user SET ? ", user , function(error, result) {
        if (error) console.log(error);
        response.redirect('/user');
    });
});

//send update form 
app.get('/user/update/:i', function (request, response) {
  let i = request.params.i; 
  connection.query("SELECT * FROM user WHERE user_id = ?", i,  function(error, result) {
        if (error) console.log(error);
        response.render("userUpdate.ejs", {"user_id": result[0].user_id, "first_name": result[0].first_name, "last_name": result[0].last_name});
    });
});

//update user in db
app.post('/user/update', function (request, response) {
    let i = request.body.user_id; 
    let user = {"first_name":request.body.first_name, "last_name":request.body.last_name};
    connection.query("UPDATE user SET ? WHERE user_id = ?", [user, i], function(error, result) {
        if (error) console.log(error);
        response.redirect('/user');
    });
});

//delete user 
app.get('/user/delete/:i', function (request, response) {
    let i = request.params.i; 
    connection.query("DELETE FROM user WHERE user_id = ?", i,  function(error, result) {
          if (error) console.log(error);
          response.redirect('/user');
      });
  });

//launch app (to listen) on specified port 
app.listen(8000, function () {
    console.log('Running on port 8000');
});

