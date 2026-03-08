const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'arviointi'
});

connection.connect(function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

module.exports = connection;