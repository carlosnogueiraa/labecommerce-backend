import { TUser, TProduct, TPurchase } from "./types"

export const users: TUser[] = [
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
]

export const createUser = (id: string, name: string, email: string, password: string, createdAt: Date) => {
    const newUser: TUser = {id, name, email, password, createdAt}
    users.push(newUser)
    console.log("Cadastro realizado com sucesso")
}

export const getAllUsers = () => {
    return users
}

export const products: TProduct[] = [
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
]

export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string) => {
    const newProduct: TProduct = {id, name, price, description, imageUrl}
    products.push(newProduct)
    console.log("Produto criado com sucesso")
}

export const getAllProducts = () => {
    return products
}

export const getProductById = (idToSearch: string) => {
    if (!idToSearch) {
        throw new Error("O ID do produto deve ser informado")
    }

    const result = products.filter((product: TProduct) => {
        return product.id === idToSearch
    })

    if (result.length === 0) {
        return null
    }

    return result[0]
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
]

export const createPurchase = (id: string, buyer: string, totalPrice: number, createdAt: Date, paid: number) => {
    const newPurchase: TPurchase = {id, buyer, totalPrice, createdAt, paid}
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
}

export const getAllPurchasesFromUserId = (userIdToSearch: string) => {
    return purchases.filter((purchase: TPurchase) => {
        if (purchase.buyer === userIdToSearch) {
            return purchase
        }
    })
}