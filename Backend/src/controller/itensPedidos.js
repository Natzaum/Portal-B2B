const { AppDataSource } = require("../config/database")
const ItensPedidos = require("../models/itensPedidos")
const Produto = require("../models/produto")
const Pedidos = require("../models/pedidos")

async function registrarItemPedido(req, res) {
  try {
    const { idPedido, idProduto, quantidade, precoUnitario } = req.body
    if (!idPedido || !idProduto || !quantidade || !precoUnitario) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const produtoRepo = AppDataSource.getRepository(Produto)
    const pedidoRepo = AppDataSource.getRepository(Pedidos)
    const itemRepo = AppDataSource.getRepository(ItensPedidos)

    const pedido = await pedidoRepo.findOne({ where: { idPedido } })
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" })

    const produto = await produtoRepo.findOne({ where: { idProd: idProduto } })
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" })

    const subtotal = quantidade * precoUnitario

    const novoItem = itemRepo.create({
      pedido,
      produto,
      quantidade,
      precoUnitario,
      subtotal
    })

    await itemRepo.save(novoItem)

    return res.status(201).json({ message: "Item de pedido registrado", item: novoItem })
  } catch (error) {
    console.error("Erro ao registrar item de pedido:", error)
    return res.status(500).json({ error: "Erro ao registrar item de pedido" })
  }
}

async function listarItensPedidos(req, res) {
  try {
    const repo = AppDataSource.getRepository(ItensPedidos)
    const itens = await repo.find({ relations: ["pedido", "produto"] })
    return res.json(itens)
  } catch (error) {
    console.error("Erro ao listar itens de pedidos:", error)
    return res.status(500).json({ error: "Erro ao listar itens de pedidos" })
  }
}

async function buscarItemPedido(req, res) {
  try {
    const idItemPedido = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(ItensPedidos)
    const item = await repo.findOne({ where: { idItemPedido }, relations: ["pedido", "produto"] })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })
    return res.json(item)
  } catch (error) {
    console.error("Erro ao buscar item de pedido:", error)
    return res.status(500).json({ error: "Erro ao buscar item de pedido" })
  }
}

async function atualizarItemPedido(req, res) {
  try {
    const idItemPedido = parseInt(req.params.id)
    const { quantidade, precoUnitario } = req.body
    const repo = AppDataSource.getRepository(ItensPedidos)
    const item = await repo.findOne({ where: { idItemPedido } })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })

    if (quantidade !== undefined) item.quantidade = quantidade
    if (precoUnitario !== undefined) item.precoUnitario = precoUnitario
    item.subtotal = item.quantidade * item.precoUnitario

    await repo.save(item)
    return res.json({ message: "Item atualizado com sucesso", item })
  } catch (error) {
    console.error("Erro ao atualizar item de pedido:", error)
    return res.status(500).json({ error: "Erro ao atualizar item de pedido" })
  }
}

async function removerItemPedido(req, res) {
  try {
    const idItemPedido = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(ItensPedidos)
    const item = await repo.findOne({ where: { idItemPedido } })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })

    await repo.remove(item)
    return res.json({ message: "Item removido com sucesso" })
  } catch (error) {
    console.error("Erro ao remover item de pedido:", error)
    return res.status(500).json({ error: "Erro ao remover item de pedido" })
  }
}

module.exports = {
  registrarItemPedido,
  listarItensPedidos,
  buscarItemPedido,
  atualizarItemPedido,
  removerItemPedido
}
