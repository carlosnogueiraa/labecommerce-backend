-- Active: 1680034004573@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

INSERT INTO users (id, email, password)
VALUES
    ("u001", "ze@gmail.com", "1234jose"),
    ("u002", "rato@gmail.com", "rato1234"),
    ("u003", "joao@gmail.com", "joao1234");


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

SELECT * FROM products;

DROP TABLE products;

INSERT INTO products (id, name, price, category)
VALUES
    ("p001", "Jordan 4 Retro SB Pine Green", 335, "Sneakers"),
    ("p002", "Nike Dunk Low Grey Fog", 137, "Sneakers"),
    ("p003", "Palace Reacto Tri-Ferg T-Shirt", 105, "Apparel"),
    ("p004", "Burberry Check Drawcord Swim Shorts Archive", 233, "Apparel"),
    ("p005", "Kanye West Donda Stem Player", 220, "Electronics");

