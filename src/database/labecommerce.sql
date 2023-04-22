-- Active: 1680034004573@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now')) NOT NULL
);

-- Insere dados na tabela users
INSERT INTO users (id, name, email, password)
VALUES
    ('u001', 'José', 'jose@email.com', '1234jose'),
    ('u002', 'Natalia', 'natalia@email.com', 'natalia1234'),
    ('u003', 'João', 'joao@email.com', 'joao1234'),
    ('u004', 'Brenno', 'brenno@email.com', '1234brenno');

-- Retorna os usuários cadastrados
SELECT * FROM users;

-- Retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users ORDER BY email ASC;

-- Deleta um usuário pelo id
DELETE FROM users WHERE id = 'u002';

-- Edita um usuário pelo id
UPDATE users
SET email = 'brenno2@email.com', password = 'brenno321'
WHERE id = 'u004';

-- Deleta a tabela users
DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

-- Insere dados na tabela products
INSERT INTO products (id, name, price, description, imageUrl)
VALUES
    ('p001', 'Jordan 4 Retro SB Pine Green', 335, 'Sneakers', 'https://image.com/jordan-4-retro-sb-pine-green'),
    ('p002', 'Nike Dunk Low Grey Fog', 137, 'Sneakers', 'https://image.com/nike-dunk-low-grey-fog'),
    ('p003', 'Palace Reacto Tri-Ferg T-Shirt', 105, 'Apparel', 'https://image.com/palace-reacto-tri-ferg'),
    ('p004', 'Burberry Check Drawcord Swim Shorts Archive', 233, 'Apparel', 'https://image.com/burberry-check-drawcord'),
    ('p005', 'Kanye West Donda Stem Player', 220, 'Electronics', 'https://image.com/donda-stem-player'),
    ('p006', 'Apple Airpods Pro', 183, 'Electronics', 'https://image.com/apple-airpods-pro');

-- Retorna os produtos cadastrados
SELECT * FROM products;

-- Retorna o resultado ordenado pela coluna price em ordem crescente
SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

-- Retorna os produtos com preços dentro do intervalo definido em ordem crescente
SELECT * FROM products
WHERE price BETWEEN 100.00 AND 300.00
ORDER BY price ASC;

-- Retorna o resultado baseado no termo de busca
SELECT * FROM products WHERE name LIKE '%Nike%';

-- Busca um produto pelo id
SELECT * FROM products WHERE id = 'p001';

-- Deleta um produto pelo id
DELETE FROM products WHERE id = 'p006';

-- Edita um produto pelo id
UPDATE products SET price = 200 WHERE id = 'p006';

-- Deleta a tabela products
DROP TABLE products;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    createdAt TEXT NOT NULL DEFAULT(DATETIME('now')),
    paid INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (buyer) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO purchases (id, buyer, totalPrice, paid)
VALUES 
    ('c001', 'u001', 2000, 0),
    ('c002', 'u001', 650, 1),
    ('c003', 'u002', 450, 0),
    ('c004', 'u002', 800, 1);

-- Retorna as compras cadastradas
SELECT * FROM purchases;

SELECT * FROM purchases WHERE buyer = 'u001';

SELECT p.id, p.totalPrice, p.paid
FROM purchases p
JOIN users u ON p.buyer = u.id
WHERE p.buyer = 'u001';

-- Simula que o pedido foi entregue no exato momento da edição
-- UPDATE purchases SET delivered_at = DATETIME('now') WHERE id = 'c004';

-- Deleta a tabela purchases
DROP TABLE purchases;

-- Tabela de Relações
CREATE TABLE purchases_products(
    purchaseId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (purchaseId) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO purchases_products
VALUES
('c001', 'p001', '3'),
('c002', 'p002', '2'),
('c003', 'p003', '2');

SELECT * FROM purchases_products;

SELECT * FROM purchases_products
INNER JOIN purchases ON purchaseId = purchases.id
INNER JOIN products ON productId = products.id;

-- Deleta a tabela purchases_products
DROP TABLE purchases_products;