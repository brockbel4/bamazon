require('dotenv').config();
var keys = require('./keys.js');
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: keys.bamazon.password,
    database: 'musicDB'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
});