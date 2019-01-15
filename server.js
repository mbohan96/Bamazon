var mysql = require('mysql');

var inquirer = require('inquirer');

var Table = require('cli-table');


var connection = mysql.createConnection({
  host : 'localhost',
  port: 3306,
  user : 'root',
  password :'',
  database : 'bamazon_db'
}); 


connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWelcome to Bamazon! Take a look at our products for sale below!\n");
   
    allProducts();
});

function allProducts() {
    
    connection.query("SELECT * from products;", function(err, res) {
        if (err) throw err;
        else {
       
        console.table(res); 
        
      }
      chooseProduct();
     
    }
    
)}

function chooseProduct() {
    inquirer
        .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the item_id of the item you're looking for?"
        },
        {
          name: "stock_quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
        ])
        .then(function(answer) {
            
            
            var product = answer.product;
            var quantity = answer.quantity;
            
            var queryProducts = "SELECT * FROM products WHERE ?";
            var cost 
            connection.query(queryProducts, {item_id: product}, function(err, res) {
                var productInfo = res[0];
                if (err) throw err;
                if (quantity > productInfo.stock_quantity) {
                    
                    console.log("We don't have enough in stock - please, choose a smaller quantity");
            
                    allProducts()
                    
                }
                
                 else {
                   
                    if (quantity <= productInfo.stock_quantity) {
                       
                        console.log("We have " + quantity + " " + productInfo.product_name + "in stock ")
                    
                        
                    
                    } 
                    if (cost = quantity * productInfo.price) {
                       
                        console.log("Your order costs $" + cost + ".00");
                       
                    }
                    
            var queryUpdate = "UPDATE products SET ? WHERE ?"
            connection.query(queryUpdate, [{stock_quantity: answer.quantity},{item_id: product}], function(err, res) {
                 if (err) throw err;
                 else  {   
                   
                    console.log("Inventory has been updated!");
                    
                                   
                  
                   inquirer
                   .prompt({
                    name: 'next',
                    type: "input",
                    message: 'Would you like to place another order (Yes/No)?',
                    })
                  .then(function(answer) {
                      if (answer.next === "Yes") {
                          allProducts();
                      } else {
                        connection.end()
                      
                        console.log("Thank you for choosing Bamazon! Come back soon!")
                       
                      }
                    
                  });
                   
                    
                      }
                })
                    }

                
            })
         
        })

        
        }

