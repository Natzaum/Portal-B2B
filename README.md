# 🛒 Portal B2B – Versátil Sistemas

Um sistema **B2B (Business to Business)** para empresas clientes da **Versátil Sistemas**, com backend em **Node.js + Express + TypeORM (MySQL)** e frontend em **HTML + CSS + JS**.  
O projeto permite cadastro de clientes, categorias e produtos, gerenciar carrinhos de compras e finalizar pedidos.

---

## 🚀 Funcionalidades

- Cadastro e login de clientes.
- Listagem de produtos com estoque.
- Adicionar itens no carrinho.
- Finalizar pedido → gera um registro no backend.
- Listagem de pedidos feitos pela empresa logada.
- Botão **Sair** para encerrar sessão.

---

## 🛠️ Tecnologias

### Backend
- Node.js
- Express
- TypeORM
- MySQL

### Frontend
- HTML5, CSS3, JavaScript
- Integração direta via **Fetch API** com backend
- Armazenamento local usando **localStorage**

---

## ⚙️ Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone git@github.com:seu-usuario/portal-b2b.git
cd portal-b2b/backend
2. Instalar dependências
```
````bash
Copiar código
npm install
3. Configurar banco de dados
No arquivo backend/src/config/database.js, configure seu MySQL:
````
````js
Copiar código
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "usuario",
  password: "senha",
  database: "portal_b2b",
  synchronize: true,
  logging: true,
  entities: [Cliente, Pedidos, Carrinho, Categoria, ItensCarrinho, ItensPedidos, Produto],
})
````
Crie o banco no MySQL:

````sql
Copiar código
CREATE DATABASE portal_b2b;
````
4. Rodar backend
````bash
Copiar código
npm start
Servidor ficará disponível em http://localhost:3000
````
5. Abrir frontend
Abra os arquivos HTML no navegador, por exemplo:

frontend/login.html

### 🔑 Fluxo de uso
Cadastro/Login

Cliente se cadastra via cadastro.html

Faz login via login.html

O usuário logado é salvo no localStorage.

Catálogo de Produtos

Página produtos.html lista todos os produtos do backend.

Botão Adicionar ao Carrinho envia item para /itensCarrinho.

Carrinho

Carrinho abre na lateral.

Mostra produtos adicionados, preço unitário e total.

Botão Finalizar Compra → envia pedido para /pedidos e limpa carrinho.

Pedidos

Página pedidos.html lista todos os pedidos do cliente logado.

Sempre acessível no botão Meus Pedidos no header.

Logout

Botão Sair limpa localStorage e redireciona para login.html.

### 📌 Observações
O backend usa synchronize: true, o que recria tabelas automaticamente em desenvolvimento.

O estoque dos produtos é decrementado ao adicionar no carrinho.

Requisições entre frontend e backend exigem CORS habilitado no backend.

