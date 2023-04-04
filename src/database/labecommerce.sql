-- Active: 1680034004573@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);


INSERT INTO users (id, email, password)
VALUES
    ("u001", "ze@gmail.com", "1234jose"),
    ("u002", "rato@gmail.com", "rato1234"),
    ("u003", "joao@gmail.com", "joao1234");


-- Insere o item na tabela users
INSERT INTO users (id, email, password)
VALUES ("u004", "brenno@gmail.com", "1234brenno");


-- Retorna os usuários cadastrados
SELECT * FROM users;


-- Retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users ORDER BY email ASC;


-- Deleta um usuário pelo id
DELETE FROM users WHERE id = "u004";


-- Edita um user pelo id
UPDATE users
SET email = "brenno2@gmail.com", password = "brenno321"
WHERE id = "u004";


-- Deleta a tabela users
DROP TABLE users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


INSERT INTO products (id, name, price, category)
VALUES
    ("p001", "Jordan 4 Retro SB Pine Green", 335, "Sneakers"),
    ("p002", "Nike Dunk Low Grey Fog", 137, "Sneakers"),
    ("p003", "Palace Reacto Tri-Ferg T-Shirt", 105, "Apparel"),
    ("p004", "Burberry Check Drawcord Swim Shorts Archive", 233, "Apparel"),
    ("p005", "Kanye West Donda Stem Player", 220, "Electronics");


-- Insere o item na tabela products
INSERT INTO products (id, name, price, category)
VALUES ("p006", "Apple Airpods Pro", 183, "Electronics");


-- Retorna os produtos cadastrados
SELECT * FROM products;


-- Retorna o resultado ordenado pela coluna price em ordem crescente
SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;


-- Retorna os produtos com preços dentro do intervalo definido em ordem crescente
SELECT * FROM products
WHERE price BETWEEN 100.00 AND 300.00
ORDER BY price ASC;


-- Retorna o resultado baseado no termo de busca
SELECT * FROM products WHERE name LIKE "%Nike%";


-- Busca um produto pelo id
SELECT * FROM products WHERE id = "p001";


-- Deleta um produto pelo id
DELETE FROM products WHERE id = "p006";


-- Edita um produto pelo id
UPDATE products SET price = "200" WHERE id = "p006";


-- Deleta a tabela products
DROP TABLE products;


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);


INSERT INTO purchases
VALUES 
    ("c001", 2000, 0, NULL, "u001"),
    ("c002", 650, 1, NULL, "u001"),
    ("c003", 450, 0, NULL, "u002"),
    ("c004", 800, 1, NULL, "u002");


-- Retorna as compras cadastrados
SELECT * FROM purchases;


-- Exercício 3
SELECT * FROM purchases WHERE buyer_id = "u001";


SELECT p.id, p.total_price, p.paid, p.delivered_at
FROM purchases p
JOIN users u ON p.buyer_id = u.id
WHERE p.buyer_id = 'u001';


-- Simula que o pedido foi entregue no exato momento da edição
UPDATE purchases SET delivered_at = DATETIME("now") WHERE id = "c004";


-- Deleta a tabela purchases
DROP TABLE purchases;