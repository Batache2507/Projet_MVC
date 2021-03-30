//import express 
const { request, response } = require('express');
let express = require('express'); 

//initialize the app 
let app = express();

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

//send list of users ? 
app.get('/user', function (request, response) {
    connection.query("select * from user;", function(error, result) {
        if (error) console(error);
        response.render('userList.ejs', {users: result});
    });
});

//launch app (to listen) on specified port 
app.listen(8000, function () {
    console.log('Running on port 8000');
})













