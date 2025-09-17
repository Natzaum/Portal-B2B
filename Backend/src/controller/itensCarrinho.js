const { AppDataSource } = require("../config/database")
const ItensCarrinho = require("../models/itensCarrinho")

// Criar item de carrinho
async function registrarItemCarrinho(req, res) {
  try {
    const { idCarrinho, idProduto, quantidade, precoUnitario } = req.body
    if (!idCarrinho || !idProduto || !quantidade || !precoUnitario) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const repo = AppDataSource.getRepository(ItensCarrinho)
    const novoItem = repo.create({ carrinho: { idCarrinho }, produto: { idProd: idProduto }, quantidade, precoUnitario })
    await repo.save(novoItem)

    return res.status(201).json({ message: "Item adicionado ao carrinho", item: novoItem })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao adicionar item ao carrinho" })
  }
}

// Listar
async function listarItensCarrinho(req, res) {
  try {
    const repo = AppDataSource.getRepository(ItensCarrinho)
    const itens = await repo.find({ relations: ["carrinho", "produto"] })
    return res.json(itens)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar itens do carrinho" })
  }
}

// Buscar
async function buscarItemCarrinho(req, res) {
  try {
    const idItemCarrinho = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(ItensCarrinho)
    const item = await repo.findOne({ where: { idItemCarrinho }, relations: ["carrinho", "produto"] })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })
    return res.json(item)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar item" })
  }
}

// Atualizar
async function atualizarItemCarrinho(req, res) {
  try {
    const idItemCarrinho = parseInt(req.params.id)
    const { quantidade, precoUnitario } = req.body
    const repo = AppDataSource.getRepository(ItensCarrinho)
    const item = await repo.findOne({ where: { idItemCarrinho } })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })

    if (quantidade) item.quantidade = quantidade
    if (precoUnitario) item.precoUnitario = precoUnitario

    await repo.save(item)
    return res.json({ message: "Item atualizado com sucesso", item })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar item" })
  }
}

// Remover
async function removerItemCarrinho(req, res) {
  try {
    const idItemCarrinho = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(ItensCarrinho)
    const item = await repo.findOne({ where: { idItemCarrinho } })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })

    await repo.remove(item)
    return res.json({ message: "Item removido com sucesso" })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao remover item" })
  }
}

module.exports = { registrarItemCarrinho, listarItensCarrinho, buscarItemCarrinho, atualizarItemCarrinho, removerItemCarrinho }
