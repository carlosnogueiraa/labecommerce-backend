import { TUser, TProduct, TPurchase, PRODUCT_CATEGORY } from "./types"

export const users: TUser[] = [
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
]

export const createUser = (id: string, email: string, password: string) => {
    const newUser: TUser = {id, email, password}
    users.push(newUser)
    console.log("Cadastro realizado com sucesso")
}

export const getAllUsers = () => {
    return users
}

export const products: TProduct[] = [
    {
        id: "p001",
        name: "Telefone",
        price: 1000,
        category: PRODUCT_CATEGORY.ELECTRONICS
    },

    {
        id: "p002",
        name: "Camiseta",
        price: 100,
        category: PRODUCT_CATEGORY.CLOTHES
    }
]

export const createProduct = (id: string, name: string, price: number, category: PRODUCT_CATEGORY) => {
    const newProduct: TProduct = {id, name, price, category}
    products.push(newProduct)
    console.log("Produto criado com sucesso")
}

export const getAllProducts = () => {
    return products
}

export const getProductById = (idToSearch: string) => {
    if (idToSearch === undefined) {
        return products
    }
    return products.filter((product: TProduct) => {
        if (product.id === idToSearch) {
            return product
        }
    })
}

export const queryProductsByName = (q: string, products: TProduct[]) => {
    q = q.toLowerCase()
    const haveProducts = products.filter((product: TProduct) => 
        product.name.toLowerCase().includes(q)
    )
    return haveProducts
}

export const purchases: TPurchase[] = [
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
]

export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number) => {
    const newPurchase: TPurchase = {userId, productId, quantity, totalPrice}
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
}

export const getAllPurchasesFromUserId = (userIdToSearch: string) => {
    return purchases.filter((purchase: TPurchase) => {
        if (purchase.userId === userIdToSearch) {
            return purchase
        }
    })
}