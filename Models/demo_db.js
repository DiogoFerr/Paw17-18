var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost:3306",
    user: "yourusername",
    password: "yourpassword"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
});