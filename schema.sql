DROP DATABASE IF EXISTS bamazon_db;



CREATE DATABASE bamazon_db;

USE bamazon_db;



CREATE TABLE products (

item_id INTEGER (11) AUTO_INCREMENT NOT NULL,

product_name  VARCHAR (30) NOT NULL,

department_name VARCHAR (30) NOT NULL, 

price INTEGER (10) DEFAULT 0,

stock_quantity INTEGER (10) DEFAULT 0,

PRIMARY KEY (item_id)

);

