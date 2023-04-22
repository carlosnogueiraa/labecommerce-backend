export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
    createdAt: Date
}

// export enum PRODUCT_CATEGORY {
//     SNEAKERS = "Tênis",
//     CLOTHES = "Roupas",
//     ELECTRONICS = "Eletrônicos"
// }

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type TPurchase = {
    id: string,
    buyer: string,
    totalPrice: number,
    createdAt: Date,
    paid: number
}


