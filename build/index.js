"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
app.get("/ping", (req, res) => {
    try {
        res.send("Pong!");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("users").orderBy("id", "asc");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("products").orderBy("id", "asc");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400);
                throw new Error("O nome deve ter pelo menos 1 caractere");
            }
        }
        const result = yield (0, knex_1.db)("products").where("name", "like", `%${q}%`);
        if (result.length === 0) {
            res.status(404).send("Nenhum produto encontrado");
        }
        else {
            res.status(200).send(result);
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password, createdAt } = req.body;
        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string");
            }
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error("Email deve ser uma string");
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error("Password deve ser uma string");
            }
        }
        const userExists = yield (0, knex_1.db)("users").where({ id });
        const emailExists = yield (0, knex_1.db)("users").where({ email });
        if (userExists.length) {
            throw new Error("Id já cadastrado");
        }
        if (emailExists.length) {
            throw new Error("Email já cadastrado");
        }
        yield (0, knex_1.db)("users").insert({
            id,
            name,
            email,
            password
        });
        const newUser = {
            id,
            name,
            email,
            password,
            createdAt
        };
        database_1.users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, description, imageUrl } = req.body;
        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string");
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
        const idExists = yield (0, knex_1.db)("products").where({ id });
        if (idExists.length) {
            throw new Error("Id já criado");
        }
        yield (0, knex_1.db)("products").insert({
            id,
            name,
            price,
            description,
            imageUrl,
        });
        const newProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        };
        database_1.products.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer, totalPrice, createdAt, paid } = req.body;
        const purchaseExists = yield (0, knex_1.db)("purchases").where({ id }).select("*");
        if (purchaseExists.length > 0) {
            throw new Error("Já existe uma compra com esse id");
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string");
            }
            const userExists = yield (0, knex_1.db)("users").where({ id }).select("*");
            if (!userExists) {
                throw new Error("Usuário não encontrado");
            }
        }
        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                throw new Error("TotalPrice deve ser um number");
            }
        }
        yield (0, knex_1.db)("purchases").insert({
            id,
            buyer,
            totalPrice,
            paid
        });
        const newPurchase = {
            id,
            buyer,
            totalPrice,
            createdAt,
            paid
        };
        database_1.purchases.push(newPurchase);
        res.status(201).send("Pedido realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productExists = yield (0, knex_1.db)("products").where({ id }).select("*");
        if (!productExists || productExists.length === 0) {
            throw new Error("Produto não encontrado");
        }
        res.status(200).send(productExists);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/users/:id/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userExists = yield (0, knex_1.db)("users").where({ id }).select("*");
        if (!userExists || userExists.length === 0) {
            throw new Error("Usuário não encontrado");
        }
        const purchases = yield (0, knex_1.db)("purchases").where("buyer", id);
        if (purchases.length === 0) {
            throw new Error("Compra não encontrada");
        }
        res.status(200).send(purchases);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userIdExists = yield (0, knex_1.db)("users").where({ id }).select("*");
        if (!userIdExists || userIdExists.length === 0) {
            throw new Error("Usuário não encontrado");
        }
        const havePurchases = yield (0, knex_1.db)("purchases").where("buyer", id);
        if (havePurchases.length > 0) {
            yield (0, knex_1.db)("purchases").where("buyer", id).del();
        }
        yield (0, knex_1.db)("users").where({ id }).del();
        res.status(200).send("Usuário deletado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productIdExists = yield (0, knex_1.db)("products").where({ id }).select("*");
        if (!productIdExists || productIdExists.length === 0) {
            throw new Error("Produto não encontrado");
        }
        const havePurchases = yield (0, knex_1.db)("purchases").where({ id });
        if (havePurchases.length > 0) {
            for (let purchase of havePurchases) {
                yield (0, knex_1.db)("purchases").where({ id: purchase.id }).del();
            }
        }
        yield (0, knex_1.db)("products").where({ id }).del();
        res.status(200).send("Produto deletado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name: newName, email: newEmail, password: newPassword } = req.body;
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new Error("NewName deve ser uma string");
            }
        }
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
        const userIdExists = yield (0, knex_1.db)("users").where({ id }).select("*");
        if (userIdExists.length === 0) {
            throw new Error("Id não encontrado");
        }
        yield (0, knex_1.db)("users").where({ id }).update({
            name: newName || userIdExists[0].name,
            email: newEmail || userIdExists[0].email,
            password: newPassword || userIdExists[0].password,
        });
        res.status(200).send("Cadastro atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name: newName, price: newPrice, description: newDescription, imageUrl: newimageUrl } = req.body;
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
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                throw new Error("NewDescription deve ser uma string");
            }
        }
        if (newimageUrl !== undefined) {
            if (typeof newimageUrl !== "string") {
                throw new Error("NewimageUrl deve ser uma string");
            }
        }
        const [product] = yield (0, knex_1.db)("products").where({ id }).select("*");
        if (!product) {
            throw new Error("Produto não encontrado");
        }
        const updatedProduct = {
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            imageUrl: newimageUrl || product.imageUrl
        };
        yield (0, knex_1.db)("products").where({ id }).update(updatedProduct);
        res.status(200).send("Produto atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const purchaseInfo = yield (0, knex_1.db)("purchases")
            .select("purchases.id as purchaseId", "totalPrice as totalPrice", "purchases.createdAt as createdAt", "paid as isPaid", "purchases.buyer as buyerId", "users.email as buyerEmail", "users.name as buyerName", "products.id", "products.name", "products.price", "products.description", "products.imageUrl", "purchases_products.quantity")
            .join("users", "purchases.buyer", "users.id")
            .join("purchases_products", "purchases.id", "purchases_products.purchaseId")
            .join("products", "purchases_products.productId", "products.id")
            .where("purchases.id", id);
        if (!purchaseInfo.length) {
            throw new Error("Compra não encontrada");
        }
        const productsList = purchaseInfo.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            imageUrl: item.imageUrl,
            quantity: item.quantity
        }));
        const { purchaseId, buyerId, buyerName, buyerEmail, totalPrice, createdAt, isPaid } = purchaseInfo[0];
        res.status(200).send({
            purchaseId,
            buyerId,
            buyerName,
            buyerEmail,
            totalPrice,
            createdAt,
            isPaid,
            productsList
        });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.delete("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const purchaseIdExists = yield (0, knex_1.db)("purchases").where({ id }).select("*");
        if (!purchaseIdExists || purchaseIdExists.length === 0) {
            throw new Error("Pedido não encontrado");
        }
        yield (0, knex_1.db)("purchases").where({ id }).del();
        res.status(200).send("Pedido cancelado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=index.js.map