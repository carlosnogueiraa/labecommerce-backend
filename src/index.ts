import {
    users, products, purchases, createUser, getAllUsers,
    createProduct, getAllProducts, getProductById, queryProductsByName,
    createPurchase, getAllPurchasesFromUserId
} from "./database";
import { TUser, TProduct, TPurchase, PRODUCT_CATEGORY } from "./types";
import express, { Request, Response } from 'express';
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/users", (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500).send(error.message)
        }
    }
})

app.get("/products", (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500).send(error.message)
        }
    }
})

app.get("/products/search", (req: Request, res: Response) => {
    try {
        // const q = req.query.q as string
        const {q} = req.query as {q: string}

        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400)
                throw new Error("O nome deve ter pelo menos 1 caractere")
            }
        }

        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

app.post("/users", (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string")
            }

            const userExists = users.find((user) => user.id === id)

            if (userExists) {
                throw new Error("Id já criado")
            }
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error("Email deve ser uma string")
            }

            const emailExists = users.find((user) => user.email === email)

            if (emailExists) {
                throw new Error("Email já criado")
            }
        }

        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error("Password deve ser uma string")
            }
        }

        const newUser: TUser = {
            id,
            email,
            password
        }

        users.push(newUser)

        res.status(201).send("Cadastro realizado com sucesso")
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

app.post("/products", (req: Request, res: Response) => {
    try {
        const { id, name, price, category } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id deve ser uma string")
            }

            const idExists = products.find((product) => product.id === id)

            if (idExists) {
                throw new Error("Id já criado")
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

        if (category !== undefined) {
            if (typeof category !== "string") {
                throw new Error("Category deve ser uma string")
            }
        }

        const newProduct: TProduct = {
            id,
            name,
            price,
            category
        }
        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/purchases", (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body

        if (userId !== undefined) {
            if (typeof userId !== "string") {
                throw new Error("UserId deve ser uma string")
            }

            if (!userId) {
                throw new Error("Usuário não existe")
            }

            const userIdExists = users.find((user) => user.id === userId)

            if (!userIdExists) {
                throw new Error("Id não encontrado")
            }
        }

        if (productId !== undefined) {
            if (typeof productId !== "string") {
                throw new Error("ProductId deve ser uma string")
            }

            if (!productId) {
                throw new Error("Produto não existe")
            }

            const productIdExists = products.find((product) => product.id === productId)

            if (!productIdExists) {
                throw new Error("Produto não encontrado")
            }

            if (typeof productId !== "string") {
                throw new Error("ProductId deve ser uma string")
            }
        }

        if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                throw new Error("Quantity deve ser um number")
            }
        }

        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                throw new Error("TotalPrice deve ser um number")
            }
        }

        const newPurchase: TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }
        purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const productIdExists = products.find((product) => product.id === id)

        if (!productIdExists) {
            throw new Error("Produto não encontrado")
        }

        const result = products.filter((product) => {
            return product.id === id
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const userIdExists = users.find((user) => user.id === id)

        if (!userIdExists) {
            throw new Error("Id não encontrado")
        }

        const result = purchases.filter((purchase) => {
            return purchase.userId === id
        })

        if (!result) {
            throw new Error("Usuário não encontrado")
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const userIdExists = users.find((user) => user.id === id)

        if (!userIdExists) {
            throw new Error("Id não encontrado")
        }

        const resultUser = users.findIndex((user) => {
            return user.id === id
        })

        resultUser < 0
            ?
            res.status(404).send("User não encontrado")
            :
            users.splice(resultUser, 1),
            res.status(200).send("User apagado com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const productIdExists = products.find((product) => product.id === id)

        if (!productIdExists) {
            throw new Error("Produto não encontrado")
        }

        const resultProduct = products.findIndex((product) => {
            return product.id === id
        })

        resultProduct < 0
            ?
            res.status(404).send("Produto não encontrado")
            :
            products.splice(resultProduct, 1),
            res.status(200).send("Produto apagado com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { email: newEmail, password: newPassword } = req.body

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

        const userIdExists = users.find((user) => user.id === id)

        if (!userIdExists) {
            throw new Error("Id não encontrado")
        }

        const userFind = users.find((user) => {
            return user.id === id
        })

        if (userFind) {
            userFind.email = newEmail || userFind.email
            userFind.password = newPassword || userFind.password
        }

        res.status(200).send("Cadastro atualizado com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name: newName, price: newPrice, category: newCategory } = req.body

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

        if (newCategory !== undefined) {
            if (typeof newCategory !== "string") {
                throw new Error("NewCategory deve ser uma string")
            }
        }

        const productIdExists = products.find((product) => product.id === id)

        if (!productIdExists) {
            throw new Error("Produto não encontrado")
        }

        let productFind = products.find((product) => {
            return product.id === id
        })

        if (productFind) {
            productFind.name = newName || productFind.name
            productFind.price = newPrice || productFind.price
            productFind.category = newCategory || productFind.category
        }

        res.status(200).send("Produto atualizado com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
})
