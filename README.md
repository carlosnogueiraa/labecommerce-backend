<h1 align="center">
  API Labecommerce
</h1>
<p>Repositório que contém a documentação da API do projeto Labecommerce da Labenu. Que permite interagir com um sistema de e-commerce. A API tem funcionalidades como buscar usuários e produtos, criar usuários, produtos e compras, além de editar e deletar usuários e produtos.</p>

## Endpoints Disponíveis

- `[GET] getAllUsers`: Endpoint que busca por todos os usuários cadastrados.
- `[GET] getAllProducts`: Endpoint que busca por todos os produtos cadastrados.
- `[GET] searchProductByName`: Endpoint que busca um produto pelo nome.
- `[GET] getProductById`: Endpoint que busca um produto pelo ID.
- `[GET] getPurchaseByUserId`: Endpoint que busca uma compra pelo ID do usuário.
- `[DELETE] deleteUserById`: Endpoint que deleta um usuário pelo ID.
- `[DELETE] deleteProductById`: Endpoint que deleta um produto pelo ID.
- `[PUT] editProductById`: Endpoint que edita um produto pelo ID.
- `[PUT] editUserById`: Endpoint que edita um usuário pelo ID.
- `[POST] createPurchase`: Endpoint que cria uma compra.
- `[POST] createProduct`: Endpoint que cria um produto.
- `[POST] createUser`: Endpoint que cria um usuário.

<br>

Para mais detalhes sobre cada endpoint consulte a [documentação da API](https://documenter.getpostman.com/view/24823099/2s93RWPr3S).
