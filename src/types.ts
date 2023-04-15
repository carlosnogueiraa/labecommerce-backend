export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
    created_at: Date
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
    image_url: string
}

export type TPurchase = {
    id: string,
    buyer: string,
    total_price: number,
    created_at: Date,
    paid: number
}


