"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.purchases = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "José",
        email: "jose@email.com",
        password: "1234jose",
        createdAt: new Date()
    },
    {
        id: "u002",
        name: "Natália",
        email: "natalia@email.com",
        password: "natalia1234",
        createdAt: new Date()
    }
];
const createUser = (id, name, email, password, createdAt) => {
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso");
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
exports.products = [
    {
        id: "p001",
        name: "Jordan 4 Retro SB Pine Green",
        price: 335,
        description: "Sneakers",
        imageUrl: "https://www.exemplo.com/jordan-4-retro-sb-pine-green"
    },
    {
        id: "p002",
        name: "Nike Dunk Low Grey Fog",
        price: 137,
        description: "Sneakers",
        imageUrl: "https://www.exemplo.com/nike-dunk-low-grey-fog"
    }
];
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    console.log("Produto criado com sucesso");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    if (!idToSearch) {
        throw new Error("O ID do produto deve ser informado");
    }
    const result = exports.products.filter((product) => {
        return product.id === idToSearch;
    });
    if (result.length === 0) {
        return null;
    }
    return result[0];
};
exports.getProductById = getProductById;
const queryProductsByName = (q, products) => {
    q = q.toLowerCase();
    const haveProducts = products.filter((product) => product.name.toLowerCase().includes(q));
    return haveProducts;
};
exports.queryProductsByName = queryProductsByName;
exports.purchases = [
    {
        id: "c001",
        buyer: "u001",
        totalPrice: 2000,
        createdAt: new Date(),
        paid: 0
    },
    {
        id: "c002",
        buyer: "u002",
        totalPrice: 450,
        createdAt: new Date(),
        paid: 0
    }
];
const createPurchase = (id, buyer, totalPrice, createdAt, paid) => {
    const newPurchase = { id, buyer, totalPrice, createdAt, paid };
    exports.purchases.push(newPurchase);
    console.log("Compra realizada com sucesso");
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchases.filter((purchase) => {
        if (purchase.buyer === userIdToSearch) {
            return purchase;
        }
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map