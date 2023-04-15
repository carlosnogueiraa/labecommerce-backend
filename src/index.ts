import {
    users, products, purchases, createUser, getAllUsers,
    createProduct, getAllProducts, getProductById, queryProductsByName,
    createPurchase, getAllPurchasesFromUserId
} from "./database";
import { TUser, TProduct, TPurchase } from "./types";
import express, { Request, Response } from 'express';
import cors from "cors"
import { db } from "./database/knex"

const app = express()

app.use(express.json())
app.use(cors())


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})

app.get("/ping", (req: Request, res: Response) => {
    try {
        res.send("Pong!")
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db("users").orderBy("id", "asc");
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db("products").orderBy("id", "asc");
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const { q } = req.query as { q: string }

        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400)
                throw new Error("O nome deve ter pelo menos 1 caractere")
            }
        }

        const result = await db("products").where("name", "like", `%${q}%`)

        if (result.length === 0) {
            res.status(404).send("Nenhum produto encontrado")
        } else {
            res.status(200).send(result)
        }
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, created_at } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string")
            }
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error("Email deve ser uma string")
            }
        }

        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error("Password deve ser uma string")
            }
        }

        const userExists = await db("users").where({ id })
        const emailExists = await db("users").where({ email })

        if (userExists.length) {
            throw new Error("Id já cadastrado")
        }

        if (emailExists.length) {
            throw new Error("Email já cadastrado")
        }

        await db("users").insert({
            id,
            name,
            email,
            password
        })

        const newUser: TUser = {
            id,
            name,
            email,
            password,
            created_at
        }

        users.push(newUser)

        res.status(201).send("Cadastro realizado com sucesso")
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string")
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error("Name deve ser uma string")
            }
        }

        if (price !== undefined) {
            if (typeof price !== "number") {
                throw new Error("Price deve ser um number")
            }
        }

        const idExists = await db("products").where({ id })

        if (idExists.length) {
            throw new Error("Id já criado")
        }

        await db("products").insert({
            id,
            name,
            price,
            description,
            image_url,
        });

        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            image_url
        }

        products.push(newProduct)

        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, buyer, total_price, created_at, paid } = req.body

        const purchaseExists = await db("purchases").where({ id }).select("*")

        if (purchaseExists.length > 0) {
            throw new Error("Já existe uma compra com esse id")
        }

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string")
            }
            
            const userExists = await db("users").where({id}).select("*")

            if (!userExists) {
                throw new Error("Usuário não encontrado")
            }
        }

        if (total_price !== undefined) {
            if (typeof total_price !== "number") {
                throw new Error("TotalPrice deve ser um number")
            }
        }

        await db("purchases").insert({
            id,
            buyer,
            total_price,
            paid
        })

        const newPurchase: TPurchase = {
            id,
            buyer,
            total_price,
            created_at,
            paid
        }

        purchases.push(newPurchase)

        res.status(201).send("Compra realizada com sucesso")
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const productExists = await db("products").where({id}).select("*")

        if (!productExists || productExists.length === 0) {
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(productExists)
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const userExists = await db("users").where({id}).select("*")

        if (!userExists || userExists.length === 0) {
            throw new Error("Usuário não encontrado")
        }

        const purchases = await db("purchases").where("buyer", id)

        if (purchases.length === 0) {
            throw new Error("Compra não encontrada")
        }

        res.status(200).send(purchases)
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const userIdExists = await db("users").where({id}).select("*")

        if (!userIdExists || userIdExists.length === 0) {
            throw new Error("Usuário não encontrado")
        }

        const havePurchases = await db("purchases").where("buyer", id)

        if (havePurchases.length > 0) {
            await db("purchases").where("buyer", id).del()
        }

        await db("users").where({id}).del()

        res.status(200).send("Usuário apagado com sucesso")
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const productIdExists = await db("products").where({id}).select("*")

        if (!productIdExists || productIdExists.length === 0) {
            throw new Error("Produto não encontrado")
        }

        const havePurchases = await db("purchases").where({id})

        if (havePurchases.length > 0) {
            for (let purchase of havePurchases) {
                await db("purchases").where({id: purchase.id}).del()
            }
        }

        await db("products").where({id}).del()

        res.status(200).send("Produto apagado com sucesso")
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const {
            name: newName, 
            email: newEmail, 
            password: newPassword
        } = req.body

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new Error("NewName deve ser uma string")
            }
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                throw new Error("NewEmail deve ser uma string")
            }
        }

        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                throw new Error("NewPassword deve ser uma string")
            }
        }

        const userIdExists = await db("users").where({id}).select("*")

        if (userIdExists.length === 0) {
            throw new Error("Id não encontrado")
        }

        await db("users").where({id}).update({
            name: newName || userIdExists[0].name,
            email: newEmail || userIdExists[0].email,
            password: newPassword || userIdExists[0].password,
        })

        res.status(200).send("Cadastro atualizado com sucesso")
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { 
            name: newName,
            price: newPrice, 
            description: newDescription, 
            image_url: newimage_url 
        } = req.body

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new Error("NewName deve ser uma string")
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                throw new Error("NewPrice deve ser um number")
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                throw new Error("NewDescription deve ser uma string")
            }
        }

        if (newimage_url !== undefined) {
            if (typeof newimage_url !== "string") {
                throw new Error("Newimage_url deve ser uma string")
            }
        }

        const [product] = await db("products").where({id}).select("*")

        if (!product) {
            throw new Error("Produto não encontrado")
        }

        const updatedProduct = {
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            image_url: newimage_url || product.image_url
        }

        await db("products").where({id}).update(updatedProduct)

        res.status(200).send("Produto atualizado com sucesso")
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 201) {
            res.status(500).send(error.message);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
})
