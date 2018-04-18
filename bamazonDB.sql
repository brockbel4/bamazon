CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	itemId INTEGER(10) AUTO_INCREMENT NOT NULL,
    productName VARCHAR(55) NOT NULL,
    departmentName VARCHAR(55) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stockQuantity INTEGER(10) NOT NULL,
    PRIMARY KEY(itemId)
);

-- INSERT INTO products(productName, departmentName, price, stockQuantity)
-- VALUES ('Potatoes', 'Produce', 2.50, 93)