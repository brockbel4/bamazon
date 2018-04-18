require('dotenv').config();
var keys = require('./keys.js');
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: keys.bamazon.password,
    database: 'bamazon'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query('SELECT * FROM products', function(err, results){
    if(err) throw err;
    for(var i = 0; i < results.length; i++){
        console.log(results[i].itemId + '\t', results[i].productName + '\t', results[i].price,);
    }
    inquirer.prompt([{

        type: 'input', 
        message: 'Please type the id number of the item you would like to purchase.',
        name: 'selectedId'
    },

    {
        type: 'input',
        message: 'How many units of this product would you like to buy?',
        name: 'selectedQuantity'

    }])
    
    .then(function(answers){
        connection.query('SELECT * FROM products WHERE products.itemId = ' + answers.selectedId, function(error, res){
            if(error) throw error;

            if(res[0] !== null){
                if(answers.selectedQuantity > res[0].stockQuantity){
                    console.log('Insufficient Quantity!');
                }else{
                    connection.query('UPDATE products SET stockQuantity = "' + (res[0].stockQuantity - answers.selectedQuantity) + '" WHERE itemId ="' + answers.selectedId + '"', function(e){
                        if(e) throw e;
                    });
                    console.log(answers.selectedQuantity * res[0].price);
                }
            }
            connection.end();
        })
        
    });
});

