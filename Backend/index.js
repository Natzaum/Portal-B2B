const express = require("express")
const cors = require("cors")
const { AppDataSource } = require("./src/config/database")
const { registrarCliente } = require("./src/controller/cliente")
const { registrarCategoria } = require("./src/controller/categoria")
const Cliente = require("./src/models/cliente")
const Categoria = require("./src/models/categoria")
const Produto = require("./src/models/produto")

const app = express()
app.use(cors({
  origin: "*"
}))

app.use(express.json())

const { listarClientes, buscarCliente, atualizarCliente, removerCliente } = require("./src/controller/cliente")
const { listarCategoria, buscarCategoria, atualizarCategoria, removerCategoria } = require("./src/controller/categoria")
const { registrarCarrinho, listarCarrinhos, buscarCarrinho, atualizarCarrinho, removerCarrinho } = require("./src/controller/carrinho")
const { registrarProduto, listarProduto, buscarProduto, atualizarProduto, removerProduto } = require("./src/controller/produto")
const { registrarPedido, listarPedidos, buscarPedido, atualizarPedido, removerPedido } = require("./src/controller/pedidos")
const { registrarItemCarrinho, listarItensCarrinho, buscarItemCarrinho, atualizarItemCarrinho, removerItemCarrinho } = require("./src/controller/itensCarrinho")
const { registrarItemPedido, listarItensPedidos, buscarItemPedido, atualizarItemPedido, removerItemPedido } = require("./src/controller/itensPedidos")
const { login } = require("./src/controller/auth")

app.post("/login", login)

app.post("/itensCarrinho", registrarItemCarrinho)
app.get("/itensCarrinho", listarItensCarrinho)
app.get("/itensCarrinho/:id", buscarItemCarrinho)
app.put("/itensCarrinho/:id", atualizarItemCarrinho)
app.delete("/itensCarrinho/:id", removerItemCarrinho)

app.post("/itensPedidos", registrarItemPedido)
app.get("/itensPedidos", listarItensPedidos)
app.get("/itensPedidos/:id", buscarItemPedido)
app.put("/itensPedidos/:id", atualizarItemPedido)
app.delete("/itensPedidos/:id", removerItemPedido)

app.post("/pedidos", registrarPedido)
app.get("/pedidos", listarPedidos)
app.get("/pedidos/:id", buscarPedido)
app.put("/pedidos/:id", atualizarPedido)
app.delete("/pedidos/:id", removerPedido)

app.post("/produtos", registrarProduto)
app.get("/produtos", listarProduto)
app.get("/produtos/:id", buscarProduto)
app.put("/produtos/:id", atualizarProduto)
app.delete("/produtos/:id", removerProduto)

app.post("/carrinhos", registrarCarrinho)
app.get("/carrinhos", listarCarrinhos)
app.get("/carrinhos/:id", buscarCarrinho)
app.put("/carrinhos/:id", atualizarCarrinho)
app.delete("/carrinhos/:id", removerCarrinho)

app.post("/clientes", registrarCliente)
app.get("/clientes", listarClientes)
app.get("/clientes/:id", buscarCliente)
app.put("/clientes/:id", atualizarCliente)
app.delete("/clientes/:id", removerCliente)

app.post("/categorias", registrarCategoria)
app.get("/categorias", listarCategoria)
app.get("/categorias/:id", buscarCategoria)
app.put("/categorias/:id", atualizarCategoria)
app.delete("/categorias/:id", removerCategoria)

app.get("/", (req, res) => {
  res.send("Olá, mundo!")
})

async function seedDatabase() {
  const clienteRepo = AppDataSource.getRepository(Cliente)
  const categoriaRepo = AppDataSource.getRepository(Categoria)
  const produtoRepo = AppDataSource.getRepository(Produto)

  const clientesExistentes = await clienteRepo.find()
  if (clientesExistentes.length === 0) {
    const clienteTeste = clienteRepo.create({
      name: "Empresa Teste LTDA",
      email: "teste@empresa.com",
      CNPJ_CPF: "12345678000199",
      telefone: "11999999999",
      endereco: "Rua Exemplo, 123",
      senha: "123456",
      ativo: true
    })
    await clienteRepo.save(clienteTeste)
  }

  const categoriasExistentes = await categoriaRepo.find()
  if (categoriasExistentes.length === 0) {
    const categorias = [
      categoriaRepo.create({ nomeCategoria: "Gestão Empresarial", ativo: true }),
      categoriaRepo.create({ nomeCategoria: "Automação Comercial", ativo: true }),
      categoriaRepo.create({ nomeCategoria: "Serviços em Nuvem", ativo: true }),
      categoriaRepo.create({ nomeCategoria: "Integrações & Suporte", ativo: true })
    ]
    await categoriaRepo.save(categorias)
  }

  const produtosExistentes = await produtoRepo.find()
  if (produtosExistentes.length === 0) {
    const categorias = await categoriaRepo.find()
    const catGestao = categorias.find(c => c.nomeCategoria === "Gestão Empresarial")
    const catAutomacao = categorias.find(c => c.nomeCategoria === "Automação Comercial")
    const catNuvem = categorias.find(c => c.nomeCategoria === "Serviços em Nuvem")
    const catSuporte = categorias.find(c => c.nomeCategoria === "Integrações & Suporte")

    const produtos = [
      {
        nomeProd: "ERP Versátil PME",
        descricao: "Sistema completo de gestão para pequenas e médias empresas",
        precoUnitario: 1200,
        quantidadeEstoque: 100,
        categoria: catGestao,
        ativo: true
      },
      {
        nomeProd: "Gestão Financeira Avançada",
        descricao: "Controle de fluxo de caixa, conciliação bancária e relatórios em tempo real",
        precoUnitario: 800,
        quantidadeEstoque: 200,
        categoria: catGestao,
        ativo: true
      },

      {
        nomeProd: "Frente de Caixa PDV",
        descricao: "Sistema rápido e integrado para vendas no balcão",
        precoUnitario: 500,
        quantidadeEstoque: 300,
        categoria: catAutomacao,
        ativo: true
      },
      {
        nomeProd: "Gestão de Estoque Inteligente",
        descricao: "Controle automático de estoque com alertas de reposição",
        precoUnitario: 650,
        quantidadeEstoque: 150,
        categoria: catAutomacao,
        ativo: true
      },

      {
        nomeProd: "Backup em Nuvem Seguro",
        descricao: "Armazenamento criptografado com restauração rápida",
        precoUnitario: 300,
        quantidadeEstoque: 500,
        categoria: catNuvem,
        ativo: true
      },
      {
        nomeProd: "Hospedagem SaaS Versátil",
        descricao: "Ambiente seguro e escalável para rodar aplicações da sua empresa",
        precoUnitario: 1000,
        quantidadeEstoque: 100,
        categoria: catNuvem,
        ativo: true
      },

      {
        nomeProd: "Integração com Marketplaces",
        descricao: "Conexão com Mercado Livre, Shopee e Amazon",
        precoUnitario: 900,
        quantidadeEstoque: 50,
        categoria: catSuporte,
        ativo: true
      },
      {
        nomeProd: "Suporte Premium",
        descricao: "Atendimento prioritário e consultoria personalizada",
        precoUnitario: 400,
        quantidadeEstoque: 500,
        categoria: catSuporte,
        ativo: true
      }
    ]

    for (const p of produtos) {
      const novoProduto = produtoRepo.create(p)
      await produtoRepo.save(novoProduto)
    }
  }
}

AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connected")

    await seedDatabase()

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((error) => console.error("Error occurred: ", error))