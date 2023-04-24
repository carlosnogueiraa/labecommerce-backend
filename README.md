<h1 align="center">
  API Labecommerce
</h1>
<p>Repositório que contém a documentação da API do projeto Labecommerce da Labenu. Que permite interagir com um sistema de e-commerce. A API tem funcionalidades como criar, deletar, buscar e editar usuários, produtos e pedidos.</p>

## Endpoints Disponíveis

- `[GET] getAllUsers`: Busca por todos os usuários cadastrados.
- `[GET] getAllProducts`: Busca por todos os produtos cadastrados.
- `[GET] searchProductByName`: Busca um produto pelo nome.
- `[GET] getProductById`: Busca um produto pelo ID.
- `[GET] getPurchasesByUserId`: Busca os pedidos feitos pelo ID do usuário.
- `[GET] getPurchaseById`: Busca um pedido pelo ID.
- `[DELETE] deleteUserById`: Deleta um usuário pelo ID.
- `[DELETE] deleteProductById`: Deleta um produto pelo ID.
- `[DELETE] deletePurchaseById`: Deleta um pedido pelo ID.
- `[PUT] editProductById`: Edita um produto pelo ID.
- `[PUT] editUserById`: Edita um usuário pelo ID.
- `[POST] createPurchase`: Cria um pedido.
- `[POST] createProduct`: Cria um produto.
- `[POST] createUser`: Cria um usuário.

<br>

Para mais detalhes sobre cada endpoint consulte a [documentação da API](https://documenter.getpostman.com/view/24823099/2s93RWPr3S).
