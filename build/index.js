"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/users", (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500).send(error.message);
        }
    }
});
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500).send(error.message);
        }
    }
});
app.get("/products/search", (req, res) => {
    try {
        const { q } = req.query;
        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400);
                throw new Error("O nome deve ter pelo menos 1 caractere");
            }
        }
        const result = database_1.products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase());
        });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
app.post("/users", (req, res) => {
    try {
        const { id, email, password } = req.body;
        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string");
            }
            const userExists = database_1.users.find((user) => user.id === id);
            if (userExists) {
                throw new Error("Id já criado");
            }
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error("Email deve ser uma string");
            }
            const emailExists = database_1.users.find((user) => user.email === email);
            if (emailExists) {
                throw new Error("Email já criado");
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error("Password deve ser uma string");
            }
        }
        const newUser = {
            id,
            email,
            password
        };
        database_1.users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
app.post("/products", (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string");
            }
            const idExists = database_1.products.find((product) => product.id === id);
            if (idExists) {
                throw new Error("Id já criado");
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error("Name deve ser uma string");
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                throw new Error("Price deve ser um number");
            }
        }
        if (category !== undefined) {
            if (typeof category !== "string") {
                throw new Error("Category deve ser uma string");
            }
        }
        const newProduct = {
            id,
            name,
            price,
            category
        };
        database_1.products.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
app.post("/purchases", (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body;
        if (userId !== undefined) {
            if (typeof userId !== "string") {
                throw new Error("UserId deve ser uma string");
            }
            if (!userId) {
                throw new Error("Usuário não existe");
            }
            const userIdExists = database_1.users.find((user) => user.id === userId);
            if (!userIdExists) {
                throw new Error("Id não encontrado");
            }
        }
        if (productId !== undefined) {
            if (typeof productId !== "string") {
                throw new Error("ProductId deve ser uma string");
            }
            if (!productId) {
                throw new Error("Produto não existe");
            }
            const productIdExists = database_1.products.find((product) => product.id === productId);
            if (!productIdExists) {
                throw new Error("Produto não encontrado");
            }
            if (typeof productId !== "string") {
                throw new Error("ProductId deve ser uma string");
            }
        }
        if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                throw new Error("Quantity deve ser um number");
            }
        }
        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                throw new Error("TotalPrice deve ser um number");
            }
        }
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        };
        database_1.purchases.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
app.get("/products/:id", (req, res) => {
    try {
        const { id } = req.params;
        const productIdExists = database_1.products.find((product) => product.id === id);
        if (!productIdExists) {
            throw new Error("Produto não encontrado");
        }
        const result = database_1.products.filter((product) => {
            return product.id === id;
        });
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
app.get("/users/:id/purchases", (req, res) => {
    try {
        const id = req.params.id;
        const userIdExists = database_1.users.find((user) => user.id === id);
        if (!userIdExists) {
            throw new Error("Id não encontrado");
        }
        const result = database_1.purchases.filter((purchase) => {
            return purchase.userId === id;
        });
        if (!result) {
            throw new Error("Usuário não encontrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
app.delete("/users/:id", (req, res) => {
    try {
        const { id } = req.params;
        const userIdExists = database_1.users.find((user) => user.id === id);
        if (!userIdExists) {
            throw new Error("Id não encontrado");
        }
        const resultUser = database_1.users.findIndex((user) => {
            return user.id === id;
        });
        resultUser < 0
            ?
                res.status(404).send("User não encontrado")
            :
                database_1.users.splice(resultUser, 1),
            res.status(200).send("User apagado com sucesso");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const { id } = req.params;
        const productIdExists = database_1.products.find((product) => product.id === id);
        if (!productIdExists) {
            throw new Error("Produto não encontrado");
        }
        const resultProduct = database_1.products.findIndex((product) => {
            return product.id === id;
        });
        resultProduct < 0
            ?
                res.status(404).send("Produto não encontrado")
            :
                database_1.products.splice(resultProduct, 1),
            res.status(200).send("Produto apagado com sucesso");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
app.put("/users/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { email: newEmail, password: newPassword } = req.body;
        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                throw new Error("NewEmail deve ser uma string");
            }
        }
        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                throw new Error("NewPassword deve ser uma string");
            }
        }
        const userIdExists = database_1.users.find((user) => user.id === id);
        if (!userIdExists) {
            throw new Error("Id não encontrado");
        }
        const userFind = database_1.users.find((user) => {
            return user.id === id;
        });
        if (userFind) {
            userFind.email = newEmail || userFind.email;
            userFind.password = newPassword || userFind.password;
        }
        res.status(200).send("Cadastro atualizado com sucesso");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { name: newName, price: newPrice, category: newCategory } = req.body;
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new Error("NewName deve ser uma string");
            }
        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                throw new Error("NewPrice deve ser um number");
            }
        }
        if (newCategory !== undefined) {
            if (typeof newCategory !== "string") {
                throw new Error("NewCategory deve ser uma string");
            }
        }
        const productIdExists = database_1.products.find((product) => product.id === id);
        if (!productIdExists) {
            throw new Error("Produto não encontrado");
        }
        let productFind = database_1.products.find((product) => {
            return product.id === id;
        });
        if (productFind) {
            productFind.name = newName || productFind.name;
            productFind.price = newPrice || productFind.price;
            productFind.category = newCategory || productFind.category;
        }
        res.status(200).send("Produto atualizado com sucesso");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
//# sourceMappingURL=index.js.map