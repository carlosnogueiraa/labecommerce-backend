"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.purchases = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "u001",
        email: "ze@gmail.com",
        password: "1234jose"
    },
    {
        id: "u002",
        email: "rato@gmail.com",
        password: "rato1234"
    }
];
const createUser = (id, email, password) => {
    const newUser = { id, email, password };
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
        name: "Telefone",
        price: 1000,
        category: types_1.PRODUCT_CATEGORY.ELECTRONICS
    },
    {
        id: "p002",
        name: "Camiseta",
        price: 100,
        category: types_1.PRODUCT_CATEGORY.CLOTHES
    }
];
const createProduct = (id, name, price, category) => {
    const newProduct = { id, name, price, category };
    exports.products.push(newProduct);
    console.log("Produto criado com sucesso");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    if (idToSearch === undefined) {
        return exports.products;
    }
    return exports.products.filter((product) => {
        if (product.id === idToSearch) {
            return product;
        }
    });
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
        userId: "u001",
        productId: "p002",
        quantity: 1,
        totalPrice: 100
    },
    {
        userId: "u002",
        productId: "p001",
        quantity: 2,
        totalPrice: 2000
    }
];
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = { userId, productId, quantity, totalPrice };
    exports.purchases.push(newPurchase);
    console.log("Compra realizada com sucesso");
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchases.filter((purchase) => {
        if (purchase.userId === userIdToSearch) {
            return purchase;
        }
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map