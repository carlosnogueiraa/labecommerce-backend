import { TUser, TProduct, TPurchase } from "./types"

export const users: TUser[] = [
    {
        id: "u001",
        name: "Zé",
        email: "ze@gmail.com",
        password: "1234jose",
        created_at: new Date()
    },

    {
        id: "u002",
        name: "Rato",
        email: "rato@gmail.com",
        password: "rato1234",
        created_at: new Date()
    }
]

export const createUser = (id: string, name: string, email: string, password: string, created_at: Date) => {
    const newUser: TUser = {id, name, email, password, created_at}
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
        image_url: "https://www.exemplo.com/jordan-4-retro-sb-pine-green"
    },

    {
        id: "p002",
        name: "Nike Dunk Low Grey Fog",
        price: 137,
        description: "Sneakers",
        image_url: "https://www.exemplo.com/nike-dunk-low-grey-fog"
    }
]

export const createProduct = (id: string, name: string, price: number, description: string, image_url: string) => {
    const newProduct: TProduct = {id, name, price, description, image_url}
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
        total_price: 2000,
        created_at: new Date(),
        paid: 0
    },

    {
        id: "c002",
        buyer: "u002",
        total_price: 450,
        created_at: new Date(),
        paid: 0
    }
]

export const createPurchase = (id: string, buyer: string, total_price: number, created_at: Date, paid: number) => {
    const newPurchase: TPurchase = {id, buyer, total_price, created_at, paid}
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