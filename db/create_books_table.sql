-- create_books_table.sql


CREATE DATABASE IF NOT EXISTS books;
USE books;

CREATE TABLE IF NOT EXISTS all_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    authors VARCHAR(255),
    date_read DATE,
    rating DECIMAL(2,1),
    review TEXT,
    format VARCHAR(50),
    contributors VARCHAR(255),
    isbn_uid VARCHAR(50)
);

USE books;
TRUNCATE TABLE all_data;
LOAD DATA LOCAL INFILE 'books.csv'
INTO TABLE all_data
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(title, authors, date_read, rating, review, format, contributors, isbn_uid);



