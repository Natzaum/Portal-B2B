const { AppDataSource } = require("../config/database")
const ItensPedidos = require("../models/itensPedidos")

// Criar item de pedido
async function registrarItemPedido(req, res) {
  try {
    const { idPedido, idProduto, quantidade, precoUnitario, subtotal } = req.body
    if (!idPedido || !idProduto || !quantidade || !precoUnitario) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const repo = AppDataSource.getRepository(ItensPedidos)
    const novoItem = repo.create({ pedido: { idPedido }, produto: { idProd: idProduto }, quantidade, precoUnitario, subtotal })
    await repo.save(novoItem)

    return res.status(201).json({ message: "Item de pedido registrado", item: novoItem })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao registrar item" })
  }
}

// Listar
async function listarItensPedidos(req, res) {
  try {
    const repo = AppDataSource.getRepository(ItensPedidos)
    const itens = await repo.find({ relations: ["pedido", "produto"] })
    return res.json(itens)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar itens de pedidos" })
  }
}

// Buscar
async function buscarItemPedido(req, res) {
  try {
    const idItemPedido = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(ItensPedidos)
    const item = await repo.findOne({ where: { idItemPedido }, relations: ["pedido", "produto"] })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })
    return res.json(item)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar item" })
  }
}

// Atualizar
async function atualizarItemPedido(req, res) {
  try {
    const idItemPedido = parseInt(req.params.id)
    const { quantidade, precoUnitario, subtotal } = req.body
    const repo = AppDataSource.getRepository(ItensPedidos)
    const item = await repo.findOne({ where: { idItemPedido } })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })

    if (quantidade) item.quantidade = quantidade
    if (precoUnitario) item.precoUnitario = precoUnitario
    if (subtotal) item.subtotal = subtotal

    await repo.save(item)
    return res.json({ message: "Item atualizado com sucesso", item })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar item" })
  }
}

// Remover
async function removerItemPedido(req, res) {
  try {
    const idItemPedido = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(ItensPedidos)
    const item = await repo.findOne({ where: { idItemPedido } })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })

    await repo.remove(item)
    return res.json({ message: "Item removido com sucesso" })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao remover item" })
  }
}

module.exports = { registrarItemPedido, listarItensPedidos, buscarItemPedido, atualizarItemPedido, removerItemPedido }
