const express = require("express")
const cors = require("cors")
const { AppDataSource } = require("./src/config/database")
const { registrarCliente } = require("./src/controller/cliente")
const { registrarCategoria } = require("./src/controller/categoria")

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

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected")

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((error) => console.error("Error occurred: ", error))